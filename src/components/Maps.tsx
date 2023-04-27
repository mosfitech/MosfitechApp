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
import axios from "axios";

// import CITIES from "../.data/Cities.json";

const TOKEN =
  "pk.eyJ1IjoiZmFuZGlsbGFkcCIsImEiOiJja2t2bGhtdW8xNWE1MnBsbXR5bTFyNm94In0.Cw8RqeLPToDY7XpQuI4cjw";

export default function Maps(props: any) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [dataKits, setDataKits] = useState<any>(props.data);

  const getDataKits = async () => {
    await axios
      .get(`https://api.berusaha.live/kits/rental/${props.uuid}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(function (response) {
        setDataKits(response.data);
      })
      //  handle error
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getDataKits();
    }, 1000); // in milliseconds
  }, [dataKits]);

  return (
    <Map
      initialViewState={{
        latitude: dataKits.latitude_kit,
        longitude: dataKits.longitude_kit,
        zoom: 16,
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
        latitude={dataKits.latitude_kit}
        longitude={dataKits.longitude_kit}
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
