import React from "react";

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((acc, curr) => acc + curr.exercises, 0)}
      </p>
    </div>
  );
};

export default Total;
