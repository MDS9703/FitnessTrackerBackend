import React from "react";

const LogOut = () => {
  const handleLogOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button id="log" onClick={handleLogOut} type="button">
      Logout
    </button>
  );
};

export default LogOut;