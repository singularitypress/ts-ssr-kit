import * as React from "react";
import { Container } from "./atomic";
import { IHeroProps } from "../../types";

export const Hero = (props: IHeroProps) => {
  const renderVideo = () => {
    return (
      <video loop autoPlay src={props.video} />
    );
  };

  return (
    <div className="hero flex justify-center items-center">
      <Container>
        {props.children}
      </Container>
      {renderVideo()}
    </div>
  );
};
