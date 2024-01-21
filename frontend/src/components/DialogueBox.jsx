import React from "react";
import "./DialogueBox.css";

const DialogueBox = ({ message, topDistance }) => {
  return (
    <div className="dialog" style={{ top: topDistance }}>
      <p style={{ color: "white" }}>{message}</p>
      <div className="arrow"></div>
    </div>
  );
};

export default DialogueBox;
