import React from "react";
import Card from "app/common/cards/Card";
import MyImage from "app/svgs/undraw_data_reports_706v.svg";

export const DashboardCategory2 = () => {
  return (
    <div>
      <Card
        cardHeader={"Category2"}
        cardBody={
          <div className="d-flex justify-content-center">
            <img src={MyImage} alt="Category2 Logo" height="200" />
          </div>
        }
        cardFooter={"Προβολή"}
      />
    </div>
  );
};
