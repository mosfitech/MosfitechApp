import { useState, useEffect, FC } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin";
import { useDispatch, useSelector } from "react-redux";
import { selectGeolocationActive } from "../redux/geolocationSlice";
import {
  selectUserCoordinate,
  selectUserRoom,
  setUserCoordinate,
} from "../redux/userSlice";
import PinMySelf from "./PinMySelf";
import { sendMyLocation } from "../socket/socket";
import { parseCookies } from "nookies";

interface Kit {
  _id: string;
  category: string;
  type: string;
  latitude_kit: number;
  longitude_kit: number;
}

interface MapsAllKitsProps {
  data: Kit[];
}

const TOKEN =
  "pk.eyJ1IjoiZmFuZGlsbGFkcCIsImEiOiJja2t2bGhtdW8xNWE1MnBsbXR5bTFyNm94In0.Cw8RqeLPToDY7XpQuI4cjw";

const MapsAllKits: FC<MapsAllKitsProps> = ({ data }) => {
  const cookies = parseCookies();
  const dispatch = useDispatch();
  const AreaCoordinate = useSelector(selectUserCoordinate);
  const [areaMap, setAreaMap] = useState<any>([
    localStorage.getItem("AreaLng"),
    localStorage.getItem("AreaLat"),
  ]);
  const Room = useSelector(selectUserRoom);
  const geolocationActive = useSelector(selectGeolocationActive);
  const [popupInfo, setPopupInfo] = useState<Kit | null>(null);
  useEffect(() => {
    const geolocationOptions: PositionOptions = {
      enableHighAccuracy: true,
    };
    if (geolocationActive === true) {
      console.log("status", geolocationActive);
      const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log();
            sendMyLocation(
              cookies.userId,
              localStorage.getItem("areaId"),
              cookies.username,
              [
                JSON.stringify(position.coords.latitude),
                JSON.stringify(position.coords.longitude),
              ],
              null,
              null,
              new Date().getTime()
            );
            console.log("Current Position:", position.coords);
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          geolocationOptions
        );
      };
      const geolocationInterval = setInterval(getGeolocation, 1000);

      // Fetch geolocation every second

      return () => {
        // Cleanup interval on component unmount

        clearInterval(geolocationInterval);
      };
    } else {
      console.log("status", geolocationActive);
    }
  }, [geolocationActive]); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    if (popupInfo) {
      // Additional actions when a popup is open
    }
  }, [popupInfo]);

  useEffect(() => {
    if (localStorage.getItem("AreaLat")) {
      setAreaMap([
        localStorage.getItem("AreaLng"),
        localStorage.getItem("AreaLat"),
      ]);
    }
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: (areaMap && areaMap[1]) || -6.177833985788182,
        longitude: (areaMap && areaMap[0]) || 106.8316507028191,
        zoom: 10,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={TOKEN}
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        onGeolocate={(position) => {
          console.log("Current Position:", position.coords);
        }}
      />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {data.map((kit, index) => (
        <Marker
          key={index}
          latitude={kit.latitude_kit}
          longitude={kit.longitude_kit}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(kit);
          }}
        >
          <Pin />
        </Marker>
      ))}
      <Marker
        key={0}
        latitude={-6.1852221}
        longitude={106.8314464}
        anchor="bottom"
        // onClick={(e) => {
        //   e.originalEvent.stopPropagation();
        //   setPopupInfo(kit);
        // }}
      >
        <PinMySelf />
      </Marker>
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
};

export default MapsAllKits;
