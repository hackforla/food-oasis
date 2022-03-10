import React from "react";
import { useAppDispatch, useUserCoordinates } from "../appReducer";
import { useHistory } from "react-router-dom";

export default function useGeolocation() {
  const dispatch = useAppDispatch();
  const userCoordinates = useUserCoordinates();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);

  const getUserLocation = React.useCallback(async () => {
    if (userCoordinates) {
      dispatch({
        type: "USER_COORDINATES_UPDATED",
        coordinates: {
          latitude: userCoordinates.latitude,
          longitude: userCoordinates.longitude,
        },
      });
      history.push("/organizations");
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
    history.push("/organizations");
  }, [dispatch, history, userCoordinates]);

  return { getUserLocation, isLoading };
}

// will return granted || prompt || denied
export const useLocationPermission = () => {
  const [permission, setPermission] = React.useState(null);

  React.useEffect(() => {
    async function getPermission() {
      const result = await navigator.permissions.query({ name: "geolocation" });
      result.onchange = () => {
        setPermission(result.state);
      };

      setPermission(result.state);
    }
    getPermission();
  }, []);
  return permission;
};
