import React from "react";

export default function CardRental(props: any) {
  console.log(props);
  return (
    <div className="mb-2 ml-5 rounded-md h-60 w-36 bg-gray-50 shadow-md">
      <div className="shadow-md mb-1">
        <img
          src="https://res.cloudinary.com/fandilladp/image/upload/v1682620331/card_vf7sin.png"
          alt=""
          width={146}
          height={161}
        />
      </div>
      <div className="px-1">
        <p className="font-semibold text-xl font-sans ">
          {props.data.category}
        </p>
        <p className="text-gray-900 font-sans text-xs">
          Type : {props.data.type}
        </p>
        <p className="text-primary-950 font-sans text-md">
          Rp. {props.data.price * 60} / Jam
        </p>
      </div>
    </div>
  );
}
