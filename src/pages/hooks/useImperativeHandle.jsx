import React, { useRef } from "react";
import Layout from "@theme/Layout";
import MyVideo from "../../components/hooks/MyVideo.jsx";

export default function UseImperativeHandle() {
  const videoRef = useRef();
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          height: "50vh",
          fontSize: "20px",
          margin: "auto",
        }}
      >
        <MyVideo ref={videoRef} />
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button onClick={() => videoRef.current.play()}>Play</button>
          <button onClick={() => videoRef.current.pause()}>Pause</button>
        </div>
      </div>
    </Layout>
  );
}
