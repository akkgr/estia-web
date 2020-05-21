import React from "react";

interface IHeader {
  headerName: string;
  subHeaderName?: string;
}

const CustomPageΗeader: React.FC<IHeader> = ({ headerName, subHeaderName }) => {
  return (
    <React.Fragment>
      <div className="jumbotron">
        <h3>{headerName}</h3>
        <p>{subHeaderName}</p>
      </div>
    </React.Fragment>
  );
};

export default CustomPageΗeader;
