import React from "react";
import Maps from "./Maps";
import Countdown from "react-countdown";

export default function OnGoingRental(props: any) {
  return (
    <div className="bg-gray-100 w-full h-96">
      <div className="max-h-2xl shadow-xl rounded-b-lg">
        <Maps />
      </div>
      <div className="bg-gray-300 flex justify-between  items-center mt-10 px-3 gap-1 ">
        <p className="text-lg font-semibold inline-block align-middle ">
          Remaining Time
        </p>
        <Countdown
          className="font-bold text-3xl inline-block align-middle "
          date={Date.now() + 1000 * 60 * props.rental_time}
          onComplete={() => console.log("ok")}
        />
      </div>
      <div
        className="mt-10 flex flex-wrap justify-center p-3 cursor-pointer"
        onClick={() => console.log("ok")}
      >
        <p className="bg-primary py-3 px-16 rounded-3xl font-bold leading-relaxed text-gray-50 inline-block align-middle">
          Selesai
        </p>
      </div>
    </div>
  );
}
