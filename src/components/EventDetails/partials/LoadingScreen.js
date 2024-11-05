import React from "react";
import ClipLoader from "react-spinners/ClipLoader"; 

const LoadingScreen = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <ClipLoader color="#fff" size={70} />
  </div>
);

export default LoadingScreen;