import React from "react";
import Card from "app/common/cards/Card";
import MyImage from "../../app/svgs/undraw_set_preferences_kwia.svg";

export const DashboardSettings = () => {
  return (
    <div>
      <Card
        cardHeader={"Ρυθμίσεις"}
        cardBody={
          <div className="d-flex justify-content-center">
            <img src={MyImage} alt="Settings Logo" height="200" />
          </div>
        }
        cardFooter={"Προβολή"}
      />
    </div>
  );
};
