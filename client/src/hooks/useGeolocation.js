import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            const { longitude, latitude } = position.coords;
            setUserCoordinates({ longitude, latitude });
          }
        },
        (error) => {
          // Usually because user has blocked location
          console.log(`Getting browser location failed: ${error.message}`);
        }
      );
    } else {
      console.log("Browser does not support getting users location.");
    }
  }, []);

  return userCoordinates;
}
