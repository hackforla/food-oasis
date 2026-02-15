import LocationSearching from "@mui/icons-material/LocationSearching";
import { Button, Tooltip } from "@mui/material";
import useGeolocation, { useLocationPermission } from "hooks/useGeolocation";
import { useState, useEffect, FC } from "react";
import * as analytics from "services/analytics";
import { useUserCoordinates } from "../../../../appReducer";
import { useMapbox } from "../../../../hooks/useMapbox";

const Geolocate: FC = () => {
  const { getUserLocation } = useGeolocation();
  const userCoordinates = useUserCoordinates();
  const locationPermission = useLocationPermission();
  const [error, setError] = useState<Error | null>(null);
  const { flyTo } = useMapbox();

  useEffect(() => {
    if (error && locationPermission === "granted") {
      setError(null);
    }
    if (locationPermission === "granted" && userCoordinates) {
      flyTo({
        longitude: (userCoordinates as { longitude: number; latitude: number }).longitude,
        latitude: (userCoordinates as { longitude: number; latitude: number }).latitude,
      });
    }
  }, [error, locationPermission, userCoordinates]);

  const useMyLocationTrigger = async (): Promise<void> => {
    try {
      await getUserLocation();
    } catch (e) {
      setError(e as Error);
    }
    analytics.postEvent("recenterMap", {});
  };

  return (
    <Tooltip
      title={
        locationPermission === "denied" || !!error
          ? "Please allow location access"
          : "Show Your Current Location"
      }
      componentsProps={{
        tooltip: {
          sx: {
            padding: "12px",
            fontSize: "0.95rem",
          },
        },
      }}
    >
      <Button
        variant={"recenter" as "outlined"}
        onClick={useMyLocationTrigger}
        disabled={locationPermission === "denied" || !!error}
        sx={(theme) => ({
          backgroundColor: theme.palette.common.white,
          width: "28px",
          height: "32px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          "&:focus, &:focus-visible, &:active": {
            backgroundColor: theme.palette.common.white,
            borderColor: "white",
          },
        })}
      >
        <LocationSearching
          sx={(theme) => ({
            fontSize: "1.25rem",
            color: theme.palette.common.black,
            zIndex: 10,
          })}
        />
      </Button>
    </Tooltip>
  );
};

export default Geolocate;
