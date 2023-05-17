import React, { useState } from "react";
import { newRoutine } from "../api/Routines";
import { useNavigate } from "react-router-dom";

const CreateRoutine = ({ routines, setRoutines }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  let navigate = useNavigate();

  const userSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await newRoutine(
        localStorage.getItem("token"),
        name,
        goal
      );

      if (result.name) {
        setRoutines([...routines, result.name]);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setName("");
    setGoal("");
    navigate("/MyRoutines");
  };
  return (
    <div>
      {localStorage.getItem("token") ? (
        <form className="postCard" onSubmit={userSubmit}>
          <input
            className="name"
            type="text"
            placeholder="title"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            className="goal"
            type="text"
            placeholder="goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          ></input>
          <div className="cardBtn">
            <button type="submit">Create Routine</button>
          </div>
        </form>
      ) : (
        <h1>Please Log In</h1>
      )}
    </div>
  );
};

export default CreateRoutine;