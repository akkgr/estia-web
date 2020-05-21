import React from "react";

interface CardParams {
  header: string;
  body: any;
}
const Cards: React.FC<CardParams> = ({ header, body, }) => {
  return (
      <React.Fragment>
        <div className="card shadow mb-4">
          <div className="card-header py-3" style={{ backgroundColor: "#def2f1" , borderColor: '#3aafa9' }}>
                <h6
                  className="m-0 font-weight-bold "
                  style={{ color: "#17252a" }}
                >
                  {header}
                </h6>
              </div>
              <div className="card-body">
                {body}
              </div>
            </div>
            </React.Fragment>
  );
};

export default Cards
