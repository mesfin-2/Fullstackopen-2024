import React from "react";

const Notification = ({ errormessage, successmessage }) => {
  if (errormessage === null && successmessage === null) {
    return null;
  }
  return (
    <>
      {errormessage ? (
        <div className="error ">
          <p>{errormessage}</p>
        </div>
      ) : (
        <div className="success ">
          <p>{successmessage}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
