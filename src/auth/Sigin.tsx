import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";

import LogoMosfitechApp from "/Logo.png";

export default function Sigin() {
  const {
    status,
    userId,
    handleLogOut,
    displayName,
    email,
    photoURL,
    handleLoginWithGoogle,
  } = useContext(AuthContext);

  return (
    <div className="place-items-center bg-gray-50 text-sm font-medium">
      <div className="bg-primary w-full h-60 rounded-b-2xl shadow-lg">
        <div className="flex justify-center">
          <div>
            <p className="font-black text-3xl text-gray-50 pt-16">
              Welcome Back !
            </p>
            <p className="font-semibold text-md text-gray-50 pt-3 font-serif">
              Enjoy a new Experience in future rentals
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-sm mt-16">
          <div className="p-4 md:p-5 lg:p-6">
            <div className="rounded-md border grid gap-y-3 bg-purple shadow-md mb-10">
              <button
                className="text-gray-50 font-bold flex items-center justify-center gap-x-2 py-3 px-4"
                // onClick={handleLoginWithGoogle}
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 11.5001C23 5.14878 17.8513 5.49432e-05 11.5 5.49432e-05C5.14872 5.49432e-05 0 5.14878 0 11.5001C0 17.24 4.20538 21.9976 9.70312 22.8604V14.8243H6.7832V11.5001H9.70312V8.96646C9.70312 6.08427 11.42 4.49224 14.0468 4.49224C15.305 4.49224 16.6211 4.71685 16.6211 4.71685V7.54693H15.171C13.7424 7.54693 13.2969 8.4334 13.2969 9.34284V11.5001H16.4863L15.9765 14.8243H13.2969V22.8604C18.7946 21.9976 23 17.24 23 11.5001Z"
                    fill="white"
                  />
                </svg>
                Sign in with Facebook
              </button>
            </div>
            <div className="rounded-md border grid gap-y-3 bg-gray-400 shadow-md">
              <button
                className="text-gray-950 font-bold flex items-center justify-center gap-x-2 py-3 px-4"
                onClick={handleLoginWithGoogle}
              >
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.54 12.2613C22.54 11.4459 22.4668 10.6618 22.3309 9.90906H11.5V14.3575H17.6891C17.4225 15.795 16.6123 17.0129 15.3943 17.8284V20.7138H19.1109C21.2855 18.7118 22.54 15.7636 22.54 12.2613Z"
                    fill="#4285F4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.4999 23.4998C14.6049 23.4998 17.2081 22.47 19.1108 20.7137L15.3942 17.8282C14.3644 18.5182 13.0472 18.9259 11.4999 18.9259C8.50467 18.9259 5.96945 16.903 5.06513 14.1848H1.22308V17.1644C3.11536 20.9228 7.00445 23.4998 11.4999 23.4998Z"
                    fill="#34A853"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.06523 14.1851C4.83523 13.4951 4.70455 12.7581 4.70455 12.0001C4.70455 11.2422 4.83523 10.5051 5.06523 9.81512V6.83557H1.22318C0.444318 8.38807 0 10.1444 0 12.0001C0 13.8558 0.444318 15.6122 1.22318 17.1647L5.06523 14.1851Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.4999 5.07386C13.1883 5.07386 14.7042 5.65409 15.896 6.79364L19.1944 3.49523C17.2029 1.63955 14.5997 0.5 11.4999 0.5C7.00445 0.5 3.11536 3.07705 1.22308 6.83545L5.06513 9.815C5.96945 7.09682 8.50468 5.07386 11.4999 5.07386Z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 flex justify-center">
        <div className="text-center">
          <p className="font-semibold text-gray-800">From Mosfitech</p>
          <p className="font-semibold text-xs text-gray-800 mt-1 mb-2">
            Sedang Digunakan sebagai pengujian Tugas Akhir | Team BIKEBIKEAJA
          </p>
        </div>
      </div>
    </div>
  );
}
