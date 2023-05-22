import React, { useState } from "react";
import { deleteRoutine } from "../api/Routines";
import UpdateRoutine from "./UpdateRoutine";
import { useNavigate } from "react-router-dom";

const SingleRoutine = ({ i, routine, myRoutines, setMyRoutines }) => {
  const [showForm, setShowForm] = useState(false);
  const [routineId, setRoutineId] = useState([]);
  const token = localStorage.getItem("token");
  const storedName = localStorage.getItem("username");
  let navigate = useNavigate();

  return (
    <div className="postCard" key={i}>
      Title:
      <div className="titie">{routine.name}</div>
      <div className="author">
        Creator:
        <div id="author">{routine.creatorId}</div>
      </div>
      <div className="goal">
        Goal:
        <div id="goal">{routine.goal}</div>
      </div>
      <button
        onClick={async () => {
          const routineId = routine.id;
          await deleteRoutine(token, routineId);
          navigate("/");
        }}
      >
        Delete Routine
      </button>
      <button
        type="button"
        className="addedbtn"
        onClick={() => {
          setRoutineId(routine.id);
          setShowForm(!showForm);
        }}
      >
        Edit
      </button>
      {showForm && storedName === routine.creatorName ? (
        <UpdateRoutine
          routineId={routineId}
          setRoutineId={setRoutineId}
          myRoutines={myRoutines}
          setMyRoutines={setMyRoutines}
        />
      ) : null}
    </div>
  );
};

export default SingleRoutine;