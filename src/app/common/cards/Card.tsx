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
        {cardHeader && (
          <div className="card-header text-center">{cardHeader}</div>
        )}
        {cardBody && (
          <div className="card-body">{cardBody}</div>
        )}
        {cardFooter && (
          <div className="card-footer">{cardFooter}</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Card;
