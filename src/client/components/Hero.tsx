import * as React from "react";
import { Container } from "./atomic";
import { IHeroProps } from "../../types";

export const Hero = (props: IHeroProps) => {
  const renderVideo = () => {
    return (
      <video loop autoPlay src={props.video.src} style={{ minHeight: props.height }} />
    );
  };

  const renderOverlay = () => {
    return (
      <div className="overlay"></div>
    );
  };

  return (
    <div className="hero flex justify-center items-center" style={{ height: props.height }}>
      <Container>
        {props.children}
      </Container>
      {renderOverlay()}
      {renderVideo()}
    </div>
  );
};
