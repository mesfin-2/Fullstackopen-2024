import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all 9</p>
      <p>average 0.555555555555556</p>
      <p>positive 66.6666666666667%</p>
    </div>
  );
};

export default Statistics;
