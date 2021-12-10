import React from "react";
import { useAppDispatch, useUserCoordinates } from "../appReducer";

export default function useGeolocation() {
  const dispatch = useAppDispatch();
  const userCoordinates = useUserCoordinates();

  const setCoordinates = React.useCallback(
    (coordinates) => {
      dispatch({
        type: "USER_COORDINATES_UPDATED",
        coordinates,
      });
    },
    [dispatch]
  );

  return React.useCallback(
    (callback) => {
      if (userCoordinates) {
        setCoordinates({
          latitude: userCoordinates.latitude,
          longitude: userCoordinates.longitude,
        });
        callback();
      }
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              callback();
            }
          },
          (error) => {
            // Usually because user has blocked location
            console.error(`Getting browser location failed: ${error.message}`);
            dispatch({
              type: "RESET_COORDINATES",
            });
          }
        );
      } else {
        console.error(
          "Browser does not support getting users location - using default location for area"
        );
        dispatch({
          type: "RESET_COORDINATES",
        });
      }
    },
    [dispatch, userCoordinates, setCoordinates]
  );
}
