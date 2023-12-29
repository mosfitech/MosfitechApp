import Lottie from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import countdown from "./countdown.json";
import { useSelector } from "react-redux";
import { selectSOSActive } from "../../redux/sosSlice";
import io from "socket.io-client";
import { SOSUSER, audioSOS } from "../../socket/socket";
import { parseCookies } from "nookies";

export default function Countdown() {
  const cookies = parseCookies();
  const sos = useSelector(selectSOSActive);
  const [validSOS, setValidSOS] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(10);
  const [recording, setRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const socketRef = useRef<any>(null);

  // useEffect(() => {
  //   socketRef.current = io.connect("ws://localhost:3003");

  //   socketRef.current.on("play-audio", (audioBlob:any) => {
  //     const blob = new Blob([audioBlob], { type: "audio/wav" });
  //     const audioURL = window.URL.createObjectURL(blob);
  //     audioRef.current.src = audioURL;
  //     audioRef.current.play();
  //   });

  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, []);
  const startRecording = async () => {
    try {
      setValidSOS(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();

      setRecording(true);
    } catch (error) {
      console.error("Couldn't start recording:", error);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };
  const handleStop = () => {
    const audioBlob = new Blob(recordedChunksRef.current, {
      type: "audio/wav",
    });
    if (audioBlob) {
      console.log("kirim semua");
      audioSOS(audioBlob);
      SOSUSER(cookies.username);
    }
    recordedChunksRef.current = []; // Reset chunks
  };

  useEffect(() => {
    console.log("valid", validSOS);
    console.log("sos", sos);

    if (!sos) {
      console.log("harusnya masuk");
      setValidSOS(false);
      stopRecording();
    }
  }, [sos]);

  return (
    sos && (
      <div className="w-screen h-screen fixed top-0 bg-primary flex justify-center z-50">
        <div className="w-56 h-auto">
          {validSOS ? (
            <div className="mt-10 bg-blue-500 bg-opacity-70 rounded-lg mx-1 w-full over h-auto ">
              <p className="text-md font-semibold font-sans text-gray-50 px-2 py-3 opacity-100">
                Selama button SOS ditekan, system akan melakukan perekaman suara
                yang akan dikirimkan beserta lokasi terakhir anda. lepaskan
                button SOS untuk mengirimkan sinyal broadcast SOS ini ke area
                anda berada
              </p>
            </div>
          ) : (
            <>
              <Lottie
                animationData={countdown}
                onLoopComplete={startRecording}
              />
            </>
          )}
        </div>
      </div>
    )
  );
}
