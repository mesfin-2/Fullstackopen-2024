import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="error success">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
