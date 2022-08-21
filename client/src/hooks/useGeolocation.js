import React from "react";
import { useAppDispatch, useUserCoordinates, useWidget } from "../appReducer";
import { useHistory } from "react-router-dom";

export default function useGeolocation() {
  const dispatch = useAppDispatch();
  const userCoordinates = useUserCoordinates();
  const isWidget = useWidget();
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
      history.push(isWidget ? "/widget" : "/organizations");
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
    history.push(isWidget ? "/widget" : "/organizations");
  }, [dispatch, history, userCoordinates, isWidget]);

  return { getUserLocation, isLoading };
}

// will return granted || prompt || denied
export const useLocationPermission = () => {
  const [permission, setPermission] = React.useState(null);
  React.useEffect(() => {
    if (navigator.permissions) {
      return null;
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
