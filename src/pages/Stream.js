import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used

const Stream = () => {
  const [count, setCount] = useState(10);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.current.push(event.data);
            }
          };

          mediaRecorder.start();

          setTimeout(() => {
            stopRecording();
          }, 11000); // Stop recording after 11 sec
        })
        .catch((error) => {
          console.error("Something went wrong!", error);
        });
    }
  }, []);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);

        // Stop all tracks
        if (videoRef.current?.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
      >
        <span className="text-xl">←</span>
      </button>

      {/* Video Stream */}
      <video
        autoPlay
        ref={videoRef}
        id="videoElement"
        className="w-11/12 max-w-lg rounded-lg shadow-lg"
      />

      {/* Recording Indicator */}
      <div className="flex items-center mt-4">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
        <h3 className="text-lg font-semibold">Recording...</h3>
      </div>

      {/* Countdown Timer */}
      <p className="mt-2 text-sm">
        Video will be downloaded after{" "}
        <span className="font-bold">{count}s</span>
      </p>
    </div>
  );
};

export default Stream;
