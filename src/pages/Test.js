import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Test = () => {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            <img src="/homeImages/1.png" alt="test" />
            <div>Example text</div>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

export default Test;
