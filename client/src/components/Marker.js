import React from "react";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

export default function MapMarker({ latitude, longitude, onClick }) {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <Pin onClick={onClick} />
    </Marker>
  );
}
