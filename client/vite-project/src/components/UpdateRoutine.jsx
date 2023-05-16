import React, { useState } from "react";
import { patchUpdateRoutine } from "../api/Fetch";

const UpdateRoutine = ({
  token,
  myroutines,
  routines,
  setRoutines,
  setMyRoutines,
  routineToEdit,
}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const updatedRoutine = await patchUpdateRoutine(
        token,
        routineToEdit,
        name,
        goal,
        isPublic
      );
      setRoutines(updatedRoutine, ...routines);
      setMyRoutines(updatedRoutine, ...myroutines);
      const redirMyRoutines = () => {
        window.location.href = "/myroutines";
      };
      redirMyRoutines();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="updateroutine-form">
      Update Routine Form
      <form onSubmit={submitHandler}>
        <div id="updateroutine-form-inputs">
          <input
            id="updateroutine-form-name"
            value={name}
            type="text"
            placeholder="New Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            id="updateroutine-form-goal"
            value={goal}
            type="text"
            placeholder="New goal"
            onChange={(e) => setGoal(e.target.value)}
          ></input>
          <label>
            <input
              id="updateroutine-form-checkbox"
              checked={isPublic}
              type="checkbox"
              onChange={(e) => setIsPublic(!isPublic)}
            ></input>
            Check to make public
          </label>
          <button id="updateroutine-form-button" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoutine;