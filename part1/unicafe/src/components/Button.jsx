import React from "react";

const Button = ({ handleOnclick, text }) => {
  return (
    <div>
      <button onClick={handleOnclick}>{text}</button>
    </div>
  );
};

export default Button;
