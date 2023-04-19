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

export default function MapsAllKits(props: any) {
  const [popupInfo, setPopupInfo] = useState(null);
  return (
    <Map
      initialViewState={{
        // -5.3710286,105.2699644
        latitude: -5.3710286,
        longitude: 105.2699644,
        zoom: 10,
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

      {props.data.map((data: any, index: any) => (
        <Marker
          latitude={data.latitude_kit}
          longitude={data.longitude_kit}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        >
          <Pin />
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude_kit)}
          latitude={Number(popupInfo.latitude_kit)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <p className="px-2 text-xs font-bold">{popupInfo._id}</p>
            <p className="px-2 text-xs font-semibold">{popupInfo.category}</p>
            <p className="px-2">{popupInfo.type}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
