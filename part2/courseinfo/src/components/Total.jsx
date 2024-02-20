import React from "react";

const Total = ({ parts }) => {
  return (
    <div>
      <h4>
        total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
        excercises
      </h4>
    </div>
  );
};

export default Total;
