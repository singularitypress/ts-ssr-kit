import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/atomic";

const _Theme = () => {
  const [count, setCount] = React.useState(0);
  const gridClassName = "";
  const levels = () => {
    return ["00", "01", "02", "03", "04", "06", "08", "12", "16", "24"]
      .map(
        (level) => {
          return <figure key={level} className={`rounded-xl p-8 ${gridClassName} dp-${level}`}>dp{level}</figure>;
        },
      );
  };
  return (
    <>
      <Helmet>
        <title>Theme</title>
      </Helmet>
      <div className="container theme-cards">
        <h1 className="text-5xl mt-4">Elevation Classses</h1>
        <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
          {levels()}
        </div>
        <h1 className="text-5xl mb-4">Buttons</h1>
        <Button onClick={() => { setCount(count + 1); console.log(count); }}>Test Button</Button>
      </div>
    </>
  );
};

export const Theme = {
  component: _Theme,
  title: "Theme",
  path: "/theme",
};
