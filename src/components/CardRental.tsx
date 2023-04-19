import React from "react";

export default function CardRental() {
  return (
    <div className="mb-2 ml-5 rounded-md h-60 w-36 bg-gray-50 shadow-md">
      <div className="shadow-md mb-1">
        <img src="/card.png" alt="" width={146} height={161} />
      </div>
      <div className="px-1">
        <p className="font-semibold text-xl font-sans ">Roadbike</p>
        <p className="text-gray-900 font-sans text-xs">
          radius rental : 1000 m
        </p>
        <p className="text-primary-950 font-sans text-md">Rp.50.000 / jam</p>
      </div>
    </div>
  );
}
