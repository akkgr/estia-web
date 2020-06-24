import React from "react";
import Card from "app/common/cards/Card";
import MyImage from "app/svgs/undraw_stock_prices_afrt.svg";

export const DashboardCategory1 = () => {
  return (
    <div>
      <Card
        cardHeader={"Category1"}
        cardBody={
          <div className="d-flex justify-content-center">
            <img src={MyImage} alt="Category1 Logo" height="200" />
          </div>
        }
        cardFooter={"Προβολή"}
      />
    </div>
  );
};
