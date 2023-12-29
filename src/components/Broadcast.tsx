import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { broadcastMessage, joinRoom } from "../socket/socket";
import { parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBroadcastMessage,
  setBroadcastMessage,
} from "../redux/broadcastSlice";

export default function Broadcast() {
  const dispatch = useDispatch(); // Move inside the functional component

  const BCMessage = useSelector(selectBroadcastMessage);

  useEffect(() => {
    const areaId = localStorage.getItem("areaId");
    if (areaId) {
      joinRoom(areaId);
    }
    broadcastMessage(dispatch);
  }, []);

  return (
    <div className="fixed z-30 w-full max-w-lg bottom-28 left-1/2 transform -translate-x-1/2 dark:bg-gray-700 dark:border-gray-600 px-10">
      <div className="w-full h-64 bg-blue-200 bg-opacity-50 rounded-xl shadow-lg">
        <p className="text-xl font-bold font-sans px-5 pt-3 pb-3 mb-1 opacity-100">
          Broadcast Area
        </p>
        {BCMessage && (
          <div className=" pb-3 mb-1 bg-primary rounded-lg mx-2 bg-opacity-70 over h-auto max-h-44 overflow-auto">
            <p className="text-sm font-semibold font-sans px-5 pt-3 opacity-100">
              {BCMessage.message}
            </p>
            <span className="text-xs inline-flex justify-end w-full px-5 opacity-100">
              {
                new Date(parseInt(BCMessage.time)).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }) +
                  " pada pukul " +
                  new Date(parseInt(BCMessage.time)).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true, // atau false, tergantung apakah Anda ingin format 12 jam atau 24 jam
                    }
                  )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
