import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import { selectUserArea, selectUserCoordinate } from "../redux/userSlice";

export default function TopNavbar({ setPages }: any) {
  const cookies = parseCookies();
  const userArea = useSelector(selectUserArea);

  console.log(cookies.username);
  return (
    <>
      <div className="max-w-2xl mx-auto px-5 mb-5 z-50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  data-slot="icon"
                  className="w-5 h-5 text-gray-900 dark:text-gray-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="bg-gray-300 border border-gray-700 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-700">
                {userArea !== null ?<>Connected in the <span className="uppercase">{userArea}</span> Area</>  : <>Scan Your Gate Location</>}
              </div>
            </div>
            <div className="ml-2" onClick={() => setPages("profile")}>
              <div>
                {cookies.username &&
                  (() => {
                    const names = cookies.username
                      .trim()
                      .split(" ")
                      .filter(Boolean);
                    const initials =
                      names.length > 1 && names[1]
                        ? `${names[0][0]}${names[1][0]}`
                        : `${names[0][0]}`;

                    return (
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 overflow-hidden border-2 border-white bg-gray-600 rounded-full dark:bg-green-700`}
                      >
                        <span className="font-medium text-xl text-gray-50 dark:text-gray-300">
                          {initials.toUpperCase()}
                        </span>
                      </div>
                    );
                  })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
