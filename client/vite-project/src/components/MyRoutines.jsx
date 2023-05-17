import React, { useEffect, useState } from "react";
import { fetchMyRoutines } from "../api/Routines";

import SingleRoutine from "./SingleRoutine";
import AttachActivity from "./AttachActivity";
const MyRoutines = ({ routines, activities }) => {
  const [myRoutines, setMyRoutines] = useState([]);

  const [token, setmytoken] = useState("");
  const [storedName, setStoredName] = useState("");

  useEffect(() => {
    setmytoken(localStorage.getItem("token"));
    setStoredName(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (storedName) {
      async function getMyRoutines() {
        const routines = await fetchMyRoutines(token, storedName);
        setMyRoutines(routines);
      }
      getMyRoutines();
    }
  }, [token]);

  if (storedName) {
    return (
      <>
        <h1 className="welcomeText">Welcome {storedName}</h1>
        <h2>{"My Routines:"}</h2>
        <div className="routine">
          {myRoutines.map((routine, i) => {
            return (
              <>
                <SingleRoutine
                  i={i}
                  routine={routine}
                  myRoutines={myRoutines}
                  setMyRoutines={setMyRoutines}
                />

                <AttachActivity
                  routineId={routine.id}
                  routines={myRoutines}
                  activities={activities}
                />
              </>
            );
          })}
        </div>
      </>
    );
  } else {
    return <h1>Please Login</h1>;
  }
};

export default MyRoutines;