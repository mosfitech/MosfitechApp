import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

export default function TopNavbar({ setPages }) {
  const { status, userId, handleLogOut, displayName, email, photoURL } =
    useContext(AuthContext);

  return (
    <>
      <div className="max-w-2xl mx-auto px-5 mb-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-300 border border-gray-700 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-700"
                placeholder="Mau sewa apa hari ini ?"
              />
            </div>
            <div className="ml-2" onClick={() => setPages("profile")}>
              <img
                className="inline-block h-9 w-10 rounded-full ring-2 ring-white"
                src={photoURL}
                alt=""
                width={39}
                height={39}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
