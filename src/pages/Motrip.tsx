import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import CardRental from "../components/CardRental";
import MapsAllKits from "../components/MapsAllKits";
import TopNavbar from "../layout/TopNavbar";
import axios from "axios";

import { selectUserArea, selectUserCoordinate, selectUserRoom, setUserArea, setUserCoordinate } from "../redux/userSlice";
import Countdown from "../components/Motion/Countdown";

export default function Motrip() {
  const dispatch = useDispatch();
  const userArea = useSelector(selectUserArea);
  const userCoordinate = useSelector(selectUserCoordinate);
  const room = useSelector(selectUserRoom);
  const [navigation, setNavigation] = useState("motrip");
  const [dataKits, setDataKits] = useState([]);

  const getAllKits = async (areaId:any) => {
    await axios
      .get("http://localhost:3003/area/byID/" + areaId, {
        headers: {
          Authorization: "2uEIsS6D1qAqVP7N9CD7qwOEXK",
        },
      })
      .then(function (response) {
        // handle success
        if(response.data){
          dispatch(setUserArea(response.data.name));
          dispatch(setUserCoordinate(response.data.coordinates));
          localStorage.setItem("Area", response.data.name)
          localStorage.setItem("AreaLat", response.data.coordinates[1])
          localStorage.setItem("AreaLng", response.data.coordinates[0])
        }
        console.log(response.data);
        // setDataKits(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    if(room !== null){
      getAllKits(room)
    }else{
      getAllKits(localStorage.getItem("areaId"))
    }
    // getAllKits();
  }, [room]); // Tambahkan room ke dependencies untuk memantau perubahan nilai room

  return (
    <>
      {navigation == "motrip" && (
        <>
          <div className="bg-gray-500 w-full h-screen">
            <MapsAllKits data={dataKits} />
          </div>
        </>
      )}
    </>
  );
}
