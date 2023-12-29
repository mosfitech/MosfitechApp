// socket/socket.ts
import io from "socket.io-client";
import { setBroadcastMessage } from "../redux/broadcastSlice";

const socket = io.connect("ws://localhost:3003");

export const joinRoom = (room: any) => {
  if (room !== "") {
    console.log("join room");
    socket.emit("join_room", room);
  }
};

export const broadcastMessage = (dispatch: any) => {
  socket.on("received_message", (dataSocket: any) => {
    dispatch(setBroadcastMessage(dataSocket));
  });
};

export const audioSOS = (audioBlob: any) => {
  socket.emit("send-audio", audioBlob);
};
export const SOSUSER = (name: any) => {
  const location = [localStorage.getItem("AreaLat"), localStorage.getItem("AreaLng")];
  console.log("location", location)
  socket.emit("send_message", {
    room: localStorage.getItem("areaId"),
    name: name,
    message: "SOS !!! " + name + " mengirimkan lokasi terakhirnya di : " + location,
    time: new Date().getTime()
  });
};

export const sendMyLocation = (
  _id: any,
  room: any,
  name: any,
  location: any,
  status: any,
  message: any,
  time: any
) => {
  socket.emit("geofencing", {
    _id,
    room,
    name,
    location: location,
    status,
    message,
    time,
  });
};
