import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>

      <button>good</button>
      <button>neutral</button>
      <button>bad</button>

      <h2>Statistics</h2>

      <div>
        <p>good 6</p>
        <p>neutral 2</p>
        <p>bad 1</p>
        <p>all 9</p>
        <p>average 0.555555555555556</p>
        <p>positive 66.6666666666667%</p>
      </div>
    </div>
  );
};

export default App;
