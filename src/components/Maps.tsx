import { useState, useMemo, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin";

// import CITIES from "../.data/Cities.json";

const TOKEN =
  "pk.eyJ1IjoiZmFuZGlsbGFkcCIsImEiOiJja2t2bGhtdW8xNWE1MnBsbXR5bTFyNm94In0.Cw8RqeLPToDY7XpQuI4cjw";

export default function Maps(props: any) {
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <Map
      initialViewState={{
        latitude: props.data.latitude_kit,
        longitude: props.data.longitude_kit,
        zoom: 12,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      <Marker
        latitude={props.data.latitude_kit}
        longitude={props.data.longitude_kit}
        anchor="bottom"
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
        }}
      >
        <Pin />
      </Marker>

      {/* 
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude_kit)}
          latitude={Number(popupInfo.latitude_kit)}
          onClose={() => setPopupInfo(null)}
        >
          <p className="px-2">{popupInfo._id}</p>
          <p className="px-2">{popupInfo.type}</p>
        </Popup>
      )} */}
    </Map>
  );
}
