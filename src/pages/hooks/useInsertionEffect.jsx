import React, { useEffect } from "react";
import Layout from "@theme/Layout";

export default function UseEffect() {
  useEffect(() => {
    const trung = document.getElementById("trung");
    trung.classList.add("anime");
    console.log("useInsertionEffect");
  }, []);
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          height: "50vh",
          fontSize: "20px",
        }}
      >
        <h1 id="trung">Trung</h1>
      </div>
    </Layout>
  );
}
