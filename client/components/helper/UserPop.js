import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";

import { useEffect,useState } from "react";

function User({ isPlay,name,email,isMe}) {

  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  function startStreamedVideo() {

      // Prefer camera resolution nearest to 1280x720.
      let constraints = { audio: true, video: { width: 1280, height: 720 } };
      
      navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = document.querySelector(".user-v");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
    }


  function stopStreamedVideo() {
    var video = document.querySelector(".user-v");
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    console.log(tracks)
  
    tracks.forEach(function(track) {
      track.stop();
    });
  
    video.srcObject = null;
  }

  return (
    <div class=" relative shadow-lg rounded-2xl w-64  text-black  dark:bg-gray-800 p-4 bg-black hover:text-yellow-500 border-2 hover:border-yellow-500 hover:translate-y-2 duration-500 ease-in-out cursor-pointer">
      {isVideo ? (
        <video autoPlay loop className=" h-48 user-v">
          <source
            src=""
            type="video/webm"
          />
          Sorry, your browser doesn't support embedded videos.
        </video>
      ) : (
        <>
          <img
            alt="profil"
            src="https://images.unsplash.com/photo-1581147543324-6a0a08a48ce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            class="rounded-t-lg h-28 w-full mb-4"
          />
          <div class="flex flex-col items-center justify-center p-4 -mt-16">
            <a class="block relative">
              <img
                alt="profil"
                src="https://zeelcodder.tech/images/home/zeel.jpeg"
                class="mx-auto object-cover rounded-full h-16 w-16 "
              />
            </a>
            <p class=" text-xl font-medium mt-2 text-yellow-500">{name}</p>
          </div>
        </>
      )}

      {isPlay && isMe && (
        <div className="absolute flex gap-2 text-xl mt-3 bottom-3 left-1/2 -translate-x-1/2">
          <div onClick={() => {
           
            setIsMicOn(!isMicOn)
          }}>
            {isMicOn ? (
              <BsFillMicFill></BsFillMicFill>
            ) : (
              <BsFillMicMuteFill></BsFillMicMuteFill>
            )}
          </div>
          <div onClick={() => {

            if(isVideo){

              stopStreamedVideo()
            }else{
              startStreamedVideo()
            }
            setIsVideo(!isVideo)
          }}>
            {isVideo ? (
              <BsFillCameraVideoFill></BsFillCameraVideoFill>
            ) : (
              <BsFillCameraVideoOffFill></BsFillCameraVideoOffFill>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
