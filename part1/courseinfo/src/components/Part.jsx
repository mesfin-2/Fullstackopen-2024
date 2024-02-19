import React from "react";

const Part = ({ part, exercises }) => {
  return (
    <div>
      <h2>
        {part} {exercises}
      </h2>
    </div>
  );
};

export default Part;
