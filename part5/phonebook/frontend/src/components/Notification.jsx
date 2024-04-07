import React from "react";

const Notification = ({ successMessage, errorMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null;
  }
  return (
    <>
      {errorMessage ? (
        <div className="error ">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="success ">
          <p>{successMessage}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
