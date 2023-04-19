import { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import CardRental from "../components/CardRental";
import MapsAllKits from "../components/MapsAllKits";
import TopNavbar from "../layout/TopNavbar";
import axios from "axios";

export default function Motrip() {
  const [navigation, setNavigation] = useState("motrip");
  const [dataKits, setDataKits] = useState([]);
  const getAllKits = async () => {
    await axios
      .get("http://localhost:3006/kits/")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setDataKits(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getAllKits();
  }, []);

  return (
    <>
      {navigation == "motrip" && (
        <div className="border-t-8 border-primary container mx-auto h-96 bg-gray-100 mt-2 rounded-t-xl">
          <div className="flex justify-center pt-3 mb-3">
            <svg
              width="64"
              height="3"
              viewBox="0 0 64 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="3" rx="1.5" fill="#C4C4C4" />
            </svg>
          </div>
          <TopNavbar />
          <div className="bg-gray-100 w-full h-60 max-h-2xl">
            <MapsAllKits data={dataKits} />
          </div>
          <div className="bg-gray-100">
            <p className="text-xl font-bold font-sans px-5 pt-3 pb-3 mb-1">
              Rekomendasi Disekitarmu
            </p>
            <ScrollMenu>
              {dataKits.map((data: any) => (
                <CardRental data={data} />
              ))}
            </ScrollMenu>
          </div>
        </div>
      )}
    </>
  );
}
