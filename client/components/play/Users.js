import React, { useEffect, useState } from "react";
import User from "../helper/UserVideoPop";
import { GoHubot } from "react-icons/go";

export default function Users(props) {
  const data = { isPlay: true };
  const [me, setMe] = useState(null);



  function addVideoStream(video,mediaStream){
   
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
  }
  function startStreamedVideo() {
  
    // Prefer camera resolution nearest to 1280x720.
    let constraints = { audio: true, video: { width: 1280, height: 720 } };
    const peer=props.peer;


    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = document.querySelector(".user-vm");
        addVideoStream(video,mediaStream);

        const id=JSON.parse(window.localStorage.getItem("info"))._id;

     
          console.log('call peer',id)

          peer.call(props.state.dataPartner.room_id, mediaStream);
          
          peer.on("call", (call) => {
          call.answer(mediaStream);
          console.log('call me')
          const video2 = document.createElement(".user-v");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video2, userVideoStream);
          });
        });
      
      })
      // .catch(function (err) {
      //   console.log(err.name + ": " + err.message);
      // }); // always check for errors at the end.
  
}

  function stopStreamedVideo() {
    var video = document.querySelector(".user-vm");
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    console.log(tracks);

    tracks.forEach(function (track) {
      track.stop();
    });

    video.srcObject = null;
  }

  useEffect(() => {
    setMe(JSON.parse(window.localStorage.getItem("info")));
  }, []);

  if (me == null) {
    return <></>;
  }

  return (
    <div className="flex  flex-1  flex-col gap-4 items-center  border-r-2 border-yellow-500">
      <div className="transform text-yellow-500 translate-y-0 hover:translate-y-2 duration-500 ease-in-out  uppercase font-black flex gap-2 items-center justify-center">
        <GoHubot></GoHubot>
        <div>devGame</div>
      </div>

      <User
        {...data}
        {...me}
        socket={props.socket}
        peer={props.peer}
        isMe={true}
        startStreamedVideo={startStreamedVideo}
        stopStreamedVideo={stopStreamedVideo}

      ></User>

      <div className="text-2xl text-yellow-500">&</div>

      <User
        {...data}
        socket={props.socket}
        {...props.state.dataPartner}
        peer={props.peer}
        isMe={false}
        startStreamedVideo={startStreamedVideo}
        stopStreamedVideo={stopStreamedVideo}
      ></User>
    </div>
  );
}
