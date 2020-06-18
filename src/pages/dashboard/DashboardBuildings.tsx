import React from "react";
import Card from "app/common/cards/Card";
import MyImage from "../../app/svgs/undraw_at_home_octe.svg";

export const DashboardBuildings = () => {
  return (
    <div>
      <Card
        cardHeader={"Κτήρια"}
        cardBody={
          <div className="d-flex justify-content-center">
            <img src={MyImage} alt="Building Logo" height='200' />
          </div>
        }
        cardFooter={"Προβολή"}
      />
    </div>
  );
};
