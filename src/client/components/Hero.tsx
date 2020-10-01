import * as React from "react";
import { Container } from "./atomic";
import { IHeroProps } from "../../types";

export const Hero = (props: IHeroProps) => {
  const { video, height, style } = props;

  const renderVideo = () => {
    return (
      <video loop autoPlay src={video.src} style={{ minHeight: height, ...style }} />
    );
  };

  const renderOverlay = () => {
    return (
      <div className="overlay"></div>
    );
  };

  return (
    <div className="hero flex justify-center items-center" style={{ height: height }}>
      <Container>
        {props.children}
      </Container>
      {renderOverlay()}
      {renderVideo()}
    </div>
  );
};
