import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <svg
        width="259"
        height="368"
        viewBox="0 0 259 368"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M184.233 367.436L75.0824 258.285L66.4651 249.751L0.944214 184.23L0.985548 184.188L9.60354 175.488L75.0479 110.043L75.0893 110.085L184.24 0.938049L258.414 75.1168L149.345 184.186L258.414 293.256L184.233 367.436ZM75.2003 223.849L83.8236 232.39L184.233 332.8L223.774 293.259L114.705 184.186L223.774 75.1168L184.233 35.5761L75.2416 144.569L75.2003 144.528L35.5409 184.186L75.2003 223.849Z"
          fill="black"
        />
      </svg>
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <svg
        width="258"
        height="367"
        viewBox="0 0 258 367"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M74.1456 366.574L0 292.426L109.14 183.288L0 74.1471L74.1456 0L183.325 109.18L191.951 117.724L257.431 183.204L257.47 183.243L248.848 191.947L183.368 257.427L183.326 257.386L74.1456 366.574ZM34.4971 292.426L74.1456 332.076L183.246 222.975L183.288 223.016L223.015 183.288L183.28 143.551L174.66 135.014L74.1456 34.4978L34.4971 74.1471L143.637 183.288L34.4971 292.426Z"
          fill="black"
        />
      </svg>
    </Arrow>
  );
}
