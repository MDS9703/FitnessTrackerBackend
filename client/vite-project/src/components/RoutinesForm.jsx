import React, { useState } from "react";
import { createNewRoutine } from "../api/Fetch";

const RoutineForm = ({ token, setRoutines, routines }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const newRoutine = await createNewRoutine(token, name, goal, isPublic);
      setRoutines([newRoutine, ...routines]);
      const redirMyRoutines = () => {
        window.location.href = "/myroutines";
      };
      redirMyRoutines();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="routine-form">
      New Routine Form
      <form onSubmit={submitHandler}>
        <div id="routine-form-inputs">
          <input
            id="routine-form-name"
            value={name}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            id="routine-form-goal"
            value={goal}
            type="text"
            placeholder="goal"
            onChange={(e) => setGoal(e.target.value)}
          ></input>
          <label>
            <input
              id="routine-form-checkbox"
              checked={isPublic}
              type="checkbox"
              onChange={(e) => setIsPublic(!isPublic)}
            ></input>
            Check to make public
          </label>
          <button id="routine-form-button" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoutineForm;