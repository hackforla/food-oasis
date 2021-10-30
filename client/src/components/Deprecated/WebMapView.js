import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const WebMapView = (props) => {
  const { searchString, setCoordinates } = props;
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(["esri/Map", "esri/views/MapView", "esri/widgets/Search"], {
      css: true,
    }).then(([ArcGISMap, MapView, Search]) => {
      const map = new ArcGISMap({
        //basemap: "topo-vector"
        basemap: "streets-navigation-vector",
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 12,
      });

      const search = new Search({ view });

      search.set({ searchTerm: searchString });
      //   search.on("search-complete", searchResponse => {
      //     console.log("search-complete fired");
      //     if (searchResponse.numResults > 0) {
      //       const center = searchResponse.results[0].results[0].extent.center;
      //     } else {
      //       console.log(searchResponse);
      //     }
      //   });
      search.on("select-result", (response) => {
        const coords = response.result.extent.center;
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      });
      search.search();
      //   .then(searchResponse => {
      //     if (searchResponse.numResults > 0) {
      //       const center = searchResponse.results[0].results[0].extent.center;
      //       setCoordinates({
      //         latitude: center.latitude,
      //         longitude: center.longitude
      //       });

      //       console.log(
      //         JSON.stringify(searchResponse.results[0].extent, null, 2)
      //       );
      //     } else {
      //       console.log(searchResponse);
      //     }
      //   });

      view.ui.add(search, "top-right");

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return <div style={{ height: "400px" }} ref={mapRef} />;
};
