import React from "react";
import "./styles.css";

const Loading = () => {
  return (
    <div
      className="row justify-content-center align-items-center"
      style={{
        top: "50%",
        left: "50%",
        position: "fixed",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
