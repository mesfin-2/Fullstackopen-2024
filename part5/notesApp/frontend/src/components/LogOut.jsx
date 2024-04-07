import React from "react";

const LogOut = ({ handleLogOut }) => {
  return (
    <div>
      <button onClick={handleLogOut}>logout</button>
    </div>
  );
};

export default LogOut;
