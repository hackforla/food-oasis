import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useUserCoordinates, useWidget } from "../appReducer";

interface Coordinates {
  latitude: number;
  longitude: number;
}

type LocationPermission = PermissionState | null;

export default function useGeolocation() {
  const dispatch = useAppDispatch() as (action: {
    type: string;
    coordinates: Coordinates;
  }) => void;
  const userCoordinates = useUserCoordinates() as Coordinates | null;
  const isWidget = useWidget() as boolean;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const getUserLocation = useCallback(async () => {
    if (userCoordinates) {
      dispatch({
        type: "USER_COORDINATES_UPDATED",
        coordinates: {
          latitude: userCoordinates.latitude,
          longitude: userCoordinates.longitude,
        },
      });
      navigate(isWidget ? "/widget" : "/organizations");
      return;
    }

    if (navigator.geolocation) {
      function getLocation() {
        return new Promise<void>((resolve, reject) => {
          setIsLoading(true);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (position) {
                dispatch({
                  type: "USER_COORDINATES_UPDATED",
                  coordinates: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
                resolve();
              }
            },
            (error) => {
              reject(`Getting browser location failed: ${error.message}`);
              setIsLoading(false);
            }
          );
        });
      }

      await getLocation();
    } else {
      console.error(
        "Browser does not support getting users location - using default location for area"
      );
    }

    setIsLoading(false);
    navigate(isWidget ? "/widget" : "/organizations");
  }, [dispatch, navigate, userCoordinates, isWidget]);

  return { getUserLocation, isLoading };
}

export const useLocationPermission = (): LocationPermission => {
  const [permission, setPermission] = useState<LocationPermission>(null);

  useEffect(() => {
    if (!navigator.permissions) {
      return undefined;
    }

    async function getPermission() {
      try {
        const result = await navigator.permissions.query({
          name: "geolocation",
        });
        result.onchange = () => {
          setPermission(result.state);
        };

        setPermission(result.state);
      } catch (e) {
        console.error(e);
      }
    }

    getPermission();
  }, []);

  return permission;
};