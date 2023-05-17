import React from "react";
import { Link } from "react-router-dom";

import { LogOut } from "./index.js";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="lnk">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/MyRoutines">
          My Routines
        </Link>
        <Link className="link" to="/CreateActivity">
          Create Activity
        </Link>
        <Link className="link" to="/Activities">
          Activities
        </Link>

        <Link className="link" to="/CreateRoutine">
          Create Routine
        </Link>
      </div>
      <h1>Fitness Tracker</h1>
      {!localStorage.getItem("token") ? (
        <div className="btn">
          <Link className="log" to="/Login">
            <button type="button">Login</button>
          </Link>
          <Link className="log" to="/SignUp">
            <button type="button">SignUp</button>
          </Link>
        </div>
      ) : (
        <div className="btn">
          <Link className="log" to="/LogOut">
            <LogOut />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;