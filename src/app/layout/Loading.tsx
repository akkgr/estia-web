import React from "react";
import "./layout.css";

const Loading = () => {
  return (
    <div className="wrapper">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
