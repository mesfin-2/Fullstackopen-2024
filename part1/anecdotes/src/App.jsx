import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  // Initialize the vote state with an array of zeros with the same length as the anecdotes array
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  const [highestVote, setHighestVote] = useState(0);
  const [selectedVote, setSelectedVote] = useState(0);
  console.log("vote-before", vote);

  const handleRandomSelect = () => {
    const randomIndex = Math.round(Math.random() * (anecdotes.length - 1));
    console.log("randIndex", randomIndex);
    setSelected(randomIndex);
  };
  const handleVote = () => {
    const updatedVotes = [...vote];
    updatedVotes[selected] += 1;
    setVote(updatedVotes);

    // Find the index of the anecdote with the highest vote count
    const maxVoteIndex = updatedVotes.indexOf(Math.max(...updatedVotes));
    setHighestVote(maxVoteIndex);

    // Set the selectedVote to the current selected anecdote if it has the highest vote count
    if (selected === maxVoteIndex) {
      setSelectedVote(selected);
    }
  };

  return (
    <div>
      <>
        <h2>Anecdotes of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {vote[selected]} votes</p>
        <button onClick={handleRandomSelect}>next anecdotes</button>
        <button onClick={handleVote}>vote</button>
      </>
      {/* it renders the anecdote with the most votes only if it's different from the currently selected anecdote */}
      {highestVote !== selected && (
        <>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[highestVote]}</p>
          <p>has {vote[highestVote]} votes</p>
        </>
      )}
    </div>
  );
};

export default App;
