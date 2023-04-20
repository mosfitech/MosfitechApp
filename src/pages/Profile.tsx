import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/authContext";
export default function Profile({ setPages }) {
  const { status, userId, handleLogOut, displayName, email, photoURL } =
    useContext(AuthContext);
  return (
    <div className="bg-primary h-full w-full">
      <div className="flex justify-start p-5 bg-gray-300 cursor-pointer">
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
      </div>
      <div className="bg-gray-300 pb-96 rounded-b-3xl shadow-xl">
        <p className="text-3xl font-semibold px-8 py-5">My Profile </p>
        <div className="flex gap-5 mx-1 justify-center rounded-lg shadow-lg py-5">
          <img className="rounded-lg" src={photoURL} alt="" />
          <div>
            <p className="text-lg text-gray-950 font-semibold">{displayName}</p>
            <p className="text-md text-gray-800">{email}</p>
            <div
              onClick={handleLogOut}
              className="cursor-pointer bg-mobarang text-gray-50 font-bold mt-1 flex justify-center py-1 rounded-lg shadow-md"
            >
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
