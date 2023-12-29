import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { setCookie } from "nookies";
import LogoMosfitechApp from "/Logo.png";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type SiginProps = {
  handleLogged: () => void;
};

export default function Sigin({ handleLogged }: SiginProps) {
  const [phoneNumber, setPhoneNumber] = useState<any>(0);
  const [validNumber, setValidNumber] = useState<any>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<any>(undefined);
  const [typeAlert, setTypeAlert] = useState<any>(undefined);
  const [guestForm, setGuestForm] = useState(false);
  const [idUser, setIdUser] = useState<any>(undefined);
  const [nameUser, setNameUser] = useState<any>(undefined);
  const [noHPUser, setNoHPUser] = useState<any>(undefined);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [OTP, setOtp] = useState("");
  
  const handleValidatePhoneNumber = (e: any) => {
    setPhoneNumber(e);
  };

  const handleGETOTP = () => {
    if (phoneNumber && phoneNumber.length > 9) {
      axios
        .post(
          import.meta.env.VITE_REACT_APP_URL + `auth/getotp`,
          {
            nohp: phoneNumber.split("+")[1],
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_REACT_APP_TOKEN,
            },
          }
        )
        .then(function (response) {
          // handle success
          // setMessageAlert(response.data.Data.data.login);
          // setTypeAlert("success");
          // setAlertVisible(true);
          setValidNumber(true);
          handleGetUserInfo();
        })
        .catch(function (error) {
          // handle error
          // setMessageAlert("Please contact your Administrator");
          // setTypeAlert("danger");
          // setAlertVisible(true);
          // console.log(error.response.data.message);
        });
    }
  };

  const handleVerifyOTP = () => {
    axios
      .post(
        import.meta.env.VITE_REACT_APP_URL + `auth/verifyotp`,
        {
          username: phoneNumber.split("+")[1],
          otp: OTP,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_REACT_APP_TOKEN,
          },
        }
      )
      .then(function (response) {
        // setMessageAlert(response.data.Data.data.error);
        // setTypeAlert("info");
        console.log(response.data.Data.data);
        if (newUser) {
          handleCreateUser(response.data.Data.data.nama);
        } else {
          setUserData(idUser, nameUser, noHPUser);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleGetUserInfo = () => {
    axios
      .post(
        import.meta.env.VITE_REACT_APP_URL + `users/userCheck`,
        {
          nohp: phoneNumber.split("+")[1],
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_REACT_APP_TOKEN,
          },
        }
      )
      .then(function (result) {
        setIdUser(result.data._id);
        setNameUser(result.data.name);
        setNoHPUser(result.data.nohp);
        setNewUser(false);
      })
      .catch(function (error) {
        setMessageAlert("Please contact your Administrator");
        setTypeAlert("danger");
        setAlertVisible(true);
        console.log(error);
        setNewUser(true);
      });
  };
  const handleCreateUser = (name: any) => {
    axios
      .post(
        import.meta.env.VITE_REACT_APP_URL + `users/`,
        {
          name: name,
          nohp: phoneNumber.split("+")[1],
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_REACT_APP_TOKEN,
          },
        }
      )
      .then(function (result) {
        console.log(result);
        setUserData(result.data._id, result.data.name, result.data.nohp);
      })
      .catch(function (error) {
        setMessageAlert("Please contact your Administrator");
        setTypeAlert("danger");
        setAlertVisible(true);
        console.log(error);
      });
  };

  const setUserData = (id: any, username: any, nohp: any) => {
    handleLogged();
    // Set the cookie with a 1-hour expiration
    setCookie(null, "userId", id, {
      maxAge: 3600, // 1 hour in seconds
      path: "/",
    });
    setCookie(null, "username", username, {
      maxAge: 3600, // 1 hour in seconds
      path: "/",
    });
    setCookie(null, "nohp", nohp, {
      maxAge: 3600, // 1 hour in seconds
      path: "/",
    });
  };

  useEffect(() => {
    if (alertVisible === true) {
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [alertVisible]);

  const handleGuestForm = () => {
    setGuestForm(true);
  };
  return (
    <div className="place-items-center bg-gray-50 text-sm font-medium">
      <div className="bg-primary w-full h-60 rounded-b-2xl shadow-lg">
        <div className="flex justify-center">
          <div>
            <p className="font-black text-3xl text-gray-50 pt-16">
              Welcome Back !
            </p>
            <p className="font-semibold text-md text-gray-50 pt-3 font-serif">
              Personal tracking
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-sm mt-16">
          <div className="p-4 md:p-5 lg:p-6">
            <div className="w-full">
              {guestForm ? (
                <>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-800 mb-2">Name</label>
                    <input
                      onChange={(e) => setNameUser(e.target.value)}
                      type="text"
                      id="text"
                      placeholder="Please insert your Name"
                      className="appearance-none border-2 border-scanner-500 rounded-lg px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-scanner-600 focus:shadow-lg"
                    />
                  </div>
                  <div className="w-full my-5 border border-scanner-500 rounded-md p-3">
                    <PhoneInput
                      defaultCountry="ID"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e: any) => handleValidatePhoneNumber(e)}
                    />
                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      onClick={()=> handleCreateUser(nameUser)}
                      type="button"
                      className="w-full py-4 bg-scanner-500 rounded-lg text-gray-50 hover:bg-primary-700"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                            />
                          </svg>
                        </div>
                        <div className="font-bold">Start</div>
                      </div>
                    </button>
                  </div>
                </>
              ) : validNumber === false ? (
                <>
                  <div className="w-full my-5 border border-primary-500 rounded-md p-3">
                    <PhoneInput
                      defaultCountry="ID"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e: any) => handleValidatePhoneNumber(e)}
                    />
                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      onClick={handleGETOTP}
                      type="button"
                      className="w-full py-4 bg-primary rounded-lg text-gray-50"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                            />
                          </svg>
                        </div>
                        <div className="font-bold">Sign in</div>
                      </div>
                    </button>
                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      onClick={handleGuestForm}
                      type="button"
                      className="w-full py-4 bg-scanner-500 rounded-lg text-gray-50"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                            />
                          </svg>
                        </div>
                        <div className="font-bold">Guest</div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label className="text-gray-800 mb-2">OTP</label>
                    <input
                      onChange={(e) => setOtp(e.target.value)}
                      type="password"
                      id="password"
                      placeholder="Please insert your OTP"
                      className="appearance-none border-2 border-primary-500 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      onClick={handleVerifyOTP}
                      type="button"
                      className="w-full py-4 bg-primary-600 rounded-lg text-gray-50 hover:bg-primary-700"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                            />
                          </svg>
                        </div>
                        <div className="font-bold">Verify OTP</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 flex justify-center">
        <div className="text-center">
          <p className="font-semibold text-gray-800">From ICT PGE</p>
        </div>
      </div>
    </div>
  );
}
