import React from "react";

const ProgressBar = ({ currentIndex, stepsCount, labels }) => {
  const widthPercentage = ((currentIndex + 1) / stepsCount) * 100;

  return (
    <div
      className="progress-bar-container"
      style={{ position: "relative", width: "100%", height: "3px" }}
    >
      <div
        className="progress-bar-background"
        style={{ width: "100%", backgroundColor: "#ddd", height: "100%" }}
      >
        <div
          className="progress-bar-fill"
          style={{
            height: "100%",
            backgroundColor: "#28a645",
            width: `${widthPercentage}%`,
          }}
        ></div>
        <div
          className="progress-indicator"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#28a645",
            position: "absolute",
            left: `${widthPercentage}%`,
            top: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
            zIndex: "2000",
          }}
        ></div>
      </div>
      {labels.map((marker, index) => (
        <div
          key={marker}
          className="progress-bar-step"
          style={{
            fontSize: "14px",
            color: "#fff",
            position: "absolute",
            bottom: "-40px",
            left: `${(100 / stepsCount) * (index + 0.5)}%`,
            transform: "translateX(-50%)",
            fontWeight: index === currentIndex ? "bold" : "normal",
          }}
        >
          {marker}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
