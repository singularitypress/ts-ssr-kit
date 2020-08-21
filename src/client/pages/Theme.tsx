import * as React from "react";
import { Helmet } from "react-helmet";

const _Theme = () => {
  const gridClassName = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4";
  return (
    <React.Fragment>
      <Helmet>
        <title>Theme</title>
      </Helmet>
      <div className="container theme-cards">
        <div className="flex flex-wrap">
          <div className={`${gridClassName} dp-00`}>dp00</div>
          <div className={`${gridClassName} dp-01`}>dp01</div>
          <div className={`${gridClassName} dp-02`}>dp02</div>
          <div className={`${gridClassName} dp-03`}>dp03</div>
          <div className={`${gridClassName} dp-04`}>dp04</div>
          <div className={`${gridClassName} dp-06`}>dp06</div>
          <div className={`${gridClassName} dp-08`}>dp08</div>
          <div className={`${gridClassName} dp-12`}>dp12</div>
          <div className={`${gridClassName} dp-16`}>dp16</div>
          <div className={`${gridClassName} dp-24`}>dp24</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const Theme = { component: _Theme, title: "Theme" };
