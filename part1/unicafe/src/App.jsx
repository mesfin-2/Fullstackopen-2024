import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => {
    setGood(() => good + 1);
  };
  const handleNeutralFeedback = () => {
    setNeutral(() => neutral + 1);
  };
  const handleBadFeedback = () => {
    setBad(() => bad + 1);
  };

  const total = good + neutral + bad;

  return (
    <div>
      <h2>Give feedback</h2>
      <div style={{ display: "flex" }}>
        <Button handleOnclick={handleGoodFeedback} text="good" />
        <Button handleOnclick={handleNeutralFeedback} text="neutral" />
        <Button handleOnclick={handleBadFeedback} text="bad" />
      </div>

      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

export default App;
