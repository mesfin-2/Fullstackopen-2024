import React from "react";

const Notification = ({ errormessage }) => {
  if (errormessage === nulll) {
    return null;
  }
  return (
    <>
      {errormessage && (
        <div className="error ">
          <p>{errormessage}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
