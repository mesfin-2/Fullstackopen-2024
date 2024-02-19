import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + bad + neutral)}%</p>
      <p>positive {good / (good + bad + neutral)}%</p>
    </div>
  );
};

export default Statistics;
