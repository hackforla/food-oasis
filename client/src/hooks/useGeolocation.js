import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useUserCoordinates, useWidget } from "../appReducer";

export default function useGeolocation() {
  const dispatch = useAppDispatch();
  const userCoordinates = useUserCoordinates();
  const isWidget = useWidget();
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
        return new Promise((resolve, reject) => {
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
              // Usually because user has blocked location
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

// will return granted || prompt || denied
export const useLocationPermission = () => {
  const [permission, setPermission] = useState(null);
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
