import React, { useEffect, useState } from "react";

import { getRoutines, deleteRoutine } from "../api/Routines";
import AttachActivity from "./AttachActivity";

const Routines = ({ activities }) => {
  const [routines, setRoutines] = useState([]);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const getAllRoutines = async () => {
      const AllRoutines = await getRoutines();
      setRoutines(AllRoutines);
    };
    getAllRoutines();
  });

  return routines.map((routine, i) => {
    return (
      <div className="postCard" key={i}>
        <h1>Routine</h1>
        <h3 className="title">Routine Title</h3>
        <div id="name"> {routine.name}</div>
        <h3 className="title">Goal</h3>
        <div className="description">{routine.goal}</div>
        <h3 className="author">Creator </h3>
        <div id="author"> {routine.creatorName}</div>

        {username === routine.creatorName ? (
          <button
            onClick={async () => {
              const routineId = routine.id;
              await deleteRoutine(token, routineId);
            }}
          >
            Delete Routine
          </button>
        ) : null}

        <h1 className="title">Activities</h1>
        {routine.activities.map((activity, i) => {
          return (
            <div className="postcard" key={i}>
              <h3 className="title">Activity Name</h3>
              <div id="id"> {activity.name}</div>
              <h3 className="description">Description </h3>
              <div className="description"> {activity.description}</div>
              <h3 className="title">Reps</h3>
              <div className="description"> {activity.count}</div>
              <h3 className="title">Duration</h3>
              <div className="description"> {activity.duration}</div>
            </div>
          );
        })}
        {username === routine.creatorName ? (
          <AttachActivity
            routineId={routine.id}
            routines={routines}
            activities={activities}
          />
        ) : null}
      </div>
    );
  });
};

export default Routines;