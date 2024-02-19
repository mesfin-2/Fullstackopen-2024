import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(1) + "%";
  const positivePercentage = ((good / total) * 100).toFixed(1) + "%";

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positivePercentage} />
    </div>
  );
};

export default Statistics;
