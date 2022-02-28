import React, { useEffect, useRef, useState } from "react";
import User from "../helper/UserVideoPop";
import { GoHubot } from "react-icons/go";
var Peer = require("simple-peer");

export default function Users(props) {
  const data = { isPlay: true };
  const [me, setMe] = useState(null);


  const [isVideoMe, setIsVideoMe] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [socket, setSoc] = useState( props.socket);
  const [stream, setStream] = useState();

  useEffect(() => {
   

    setMe(JSON.parse(window.localStorage.getItem("info")));
    
    socket.on("hey", (data) => {
      acceptCall(data.signal,data.from)
    });
    StartStrem()

  }, []);

  function StartStrem() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream)=>{
        setStream(stream);
        callPeer(props.state.dataPartner.socket_id,stream)
      })
      .catch(() => {});
  }
 

  function callPeer(id,stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
      });
    });

    var video = document.querySelector(".user-vm");
    addVideoStream(video, stream);
    setIsVideoMe(true);
    peer.on("stream", (stream) => {
      var video = document.querySelector(".user-v");
      addVideoStream(video, stream);
      setIsVideo(true);
    });
    
    socket.on("callAccepted", signal => {     
      peer.signal(signal);
    })
    
  }

  function acceptCall(s,f) {
    // setCallAccepted(true);

    
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: f });
    });

    peer.on("stream", (stream) => {
      var video2 = document.querySelector(".user-v");
      setIsVideo(true);
      // console.log(video2);
      addVideoStream(video2, stream);
      setIsVideo(true)
    });

    peer.signal(s);
    
  }


  function addVideoStream(video, mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
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
        isMe={true}
        StartStrem={StartStrem}
        stopStreamedVideo={stopStreamedVideo}
        isVideo={isVideoMe}
      ></User>

      <div className="text-2xl text-yellow-500">&</div>

      <User
        {...data}
        socket={props.socket}
        {...props.state.dataPartner}
        isMe={false}
        StartStrem={StartStrem}
        stopStreamedVideo={stopStreamedVideo}
        isVideo={isVideo}
      ></User>
    </div>
  );
}
