import React, { useEffect } from "react";

const Alert = ({ type, message, removeAlert, list }) => {
  // list property olarak getirmemizin nedeni, liste her değiştiğinde yeni bir timeout atayacak.
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list,removeAlert]);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
