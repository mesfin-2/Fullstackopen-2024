import { useState } from "react";
import Statistics from "./components/Statistics";

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

      <Statistics />
    </div>
  );
};

export default App;
