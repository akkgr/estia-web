import React from "react";

interface ICard {
  cardHeader?: any;
  cardBody?: any;
  cardFooter?: any;
}

const Card: React.FC<ICard> = ({ cardHeader, cardBody, cardFooter }) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header text-center">{cardHeader}</div>
        <div className="card-body">{cardBody}</div>
        <div className="card-footer">{cardFooter}</div>
      </div>
    </React.Fragment>
  );
};

export default Card;
