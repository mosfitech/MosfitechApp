import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import Maps from "../components/Maps";

import { AuthContext } from "../context/authContext";
import QrReader from "react-qr-reader";

export default function Rental({ setPages }) {
  const { status, userId, handleLogOut, displayName, email, photoURL } =
    useContext(AuthContext);

  const previewStyle = {
    height: "500px",
    width: "100%",
  };
  const [selected, setSelected] = useState("environment");
  const [result, setResult] = useState<any>(null);
  const [dataKits, setDataKits] = useState<any>();
  const [rentalTime, setRentalTime] = useState<number>(15);
  const [readyToRental, setReadytoRental] = useState(false);
  const [rentalStatus, setRentalStatus] = useState(0);

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleScan = (data: any) => {
    if (data !== null) {
      setResult(data);
      console.log(data);
    }
  };

  const handleRentalTime = (e: any) => {
    setRentalTime(e);
  };

  const getDataKits = async () => {
    await axios
      .get(`http://127.0.0.1.:3006/kits/rental/${result}`)
      .then(function (response) {
        setDataKits(response.data);
        console.log(response);
      })
      //  handle error
      .catch(function (error) {
        console.log(error);
      });
  };
  const pubKits = async () => {
    await axios
      .put(`http://127.0.0.1.:3006/kits/publish/`, {
        uuid: result,
        rental_status: rentalStatus,
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handleSubmit = async () => {
    await axios
      .put(`http://127.0.0.1.:3006/kits/rental/${result}`, {
        rental_status: 1,
        rental_time: rentalTime,
        latest_rent_username: displayName,
        latest_rent_email: email,
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data.status == 200) {
          setRentalStatus(1);
          pubKits();
          setReadytoRental(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const updateEndRental = async () => {
    await axios
      .put(`http://127.0.0.1.:3006/kits/rental/${result}`, {
        rental_status: 0,
        rental_time: 0,
        latest_rent_username: displayName,
        latest_rent_email: email,
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data.status == 200) {
          pubKits();
          setReadytoRental(false);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handleEndRental = () => {
    setRentalStatus(0);
    updateEndRental();
  };

  useEffect(() => {
    if (result !== null) {
      getDataKits();
    }
    // console.log(dataKits);
  }, [result, readyToRental]);

  return (
    <div className="w-full h-screen bg-primary">
      <div className="flex justify-start p-5 bg-gray-300">
        {!readyToRental && (
          <svg
            onClick={() => setPages("motrip")}
            width="21"
            height="13"
            viewBox="0 0 21 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.39929 11.8714C7.15727 12.0865 6.82907 12.2073 6.48686 12.2073C6.14464 12.2073 5.81644 12.0865 5.57443 11.8714L0.412162 7.28274C0.170218 7.06761 0.0343018 6.77588 0.0343018 6.47169C0.0343018 6.1675 0.170218 5.87577 0.412162 5.66064L5.57443 1.07196C5.81783 0.862997 6.14383 0.747369 6.48221 0.749982C6.82059 0.752596 7.14428 0.873243 7.38357 1.08594C7.62285 1.29863 7.75857 1.58636 7.76152 1.88714C7.76446 2.18792 7.63437 2.4777 7.39929 2.69406L4.44002 5.32452H19.3925C19.7348 5.32452 20.0631 5.44538 20.3051 5.66052C20.5471 5.87566 20.6831 6.16744 20.6831 6.47169C20.6831 6.77594 20.5471 7.06773 20.3051 7.28286C20.0631 7.498 19.7348 7.61886 19.3925 7.61886H4.44002L7.39929 10.2493C7.64123 10.4644 7.77715 10.7562 7.77715 11.0604C7.77715 11.3646 7.64123 11.6563 7.39929 11.8714Z"
              fill="black"
            />
          </svg>
        )}
      </div>

      {result !== null ? (
        <>
          {readyToRental ? (
            <div>
              <div className="bg-gray-300 w-full h-96 max-h-2xl shadow-xl rounded-b-lg">
                <Maps data={dataKits} />
              </div>
              <div className="flex justify-between  items-center mt-10 px-3 gap-1 ">
                <p className="text-lg font-semibold inline-block align-middle ">
                  Remaining Time
                </p>
                <Countdown
                  className="font-bold text-3xl inline-block align-middle "
                  date={Date.now() + 1000 * 60 * rentalTime}
                  onComplete={handleEndRental}
                />
              </div>
              <div
                className="mt-10 flex flex-wrap justify-center p-3 cursor-pointer"
                onClick={handleEndRental}
              >
                <p className="bg-primary py-3 px-16 rounded-3xl font-bold leading-relaxed text-gray-50 inline-block align-middle">
                  Selesai
                </p>
              </div>
            </div>
          ) : (
            <>
              {dataKits && (
                <div className="bg-gray-300 rounded-b-2xl py-6 border-b border-slate-200 text-left px-6 pt-20">
                  <div className="flex flex-wrap justify-start">
                    <p className="font-bold leading-relaxed text-gray-950 mb-4">
                      UUID : {result}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-start">
                    <p className="font-bold leading-relaxed text-gray-950 mb-4">
                      Category : {dataKits.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-start">
                    <p className="font-bold leading-relaxed text-gray-950 mb-4">
                      Type : {dataKits.type}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-start ">
                    <p className="font-bold leading-relaxed text-gray-950 mb-4">
                      Harga Sewa : Rp. {dataKits.price} / menit
                    </p>
                  </div>
                  <div className="flex flex-wrap mb-2">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                      <label className="font-bold leading-relaxed text-gray-950 mb-3">
                        Waktu Sewa
                      </label>
                      <div className="relative">
                        <select
                          className="block appearance-none w-full bg-gray-500 border border-gray-200 text-gray-950 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-bold"
                          id="grid-state"
                          onChange={(e) => handleRentalTime(e.target.value)}
                        >
                          <option>15</option>
                          <option>20</option>
                          <option>30</option>
                          <option>60</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-950 font-semibold">
                          <p className="text-gray-900 px-2">Menit</p>
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-start bg-gray-500 p-3">
                    <p className="font-bold leading-relaxed text-gray-950 inline-block align-middle">
                      Estimasi Biaya : Rp. {dataKits.price * rentalTime}
                    </p>
                  </div>
                  <div
                    className="mt-10 flex flex-wrap justify-center p-3 cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <p className="bg-primary p-3 rounded-xl font-bold leading-relaxed text-gray-50 inline-block align-middle">
                      Sewa Sekarang
                    </p>
                  </div>
                  <div className="flex justify-center pt-10">
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
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="bg-gray-300 rounded-b-3xl shadow-xl">
          <div className="flex justify-center">
            <QrReader
              facingMode={selected}
              delay={500}
              onError={handleError}
              onScan={handleScan}
              // chooseDeviceId={()=>selected}
              style={{ width: "600px" }}
            />
          </div>
          <div className="flex items-center justify-center pb-3">
            <select onChange={(e) => setSelected(e.target.value)}>
              <option value={"environment"}>Back Camera</option>
              <option value={"user"}>Front Camera</option>
            </select>
          </div>
          <div className="flex items-center justify-center pb-10">
            <p className="font-bold text-xl">Scan Vehicle QR Code </p>
          </div>
        </div>
      )}
    </div>
  );
}
