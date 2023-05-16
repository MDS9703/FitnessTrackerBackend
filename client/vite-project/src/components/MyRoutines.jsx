import React, { useState, useEffect } from "react";
import { removeActivityfromRoutine } from "../api/Fetch";
import { RoutineForm, Dropdown } from "./index";
import { Link } from "react-router-dom";
import UpdateMyActivities from "./UpdateMyActivities";

const MyRoutines = ({
  token,
  setRoutines,
  routines,
  myroutines,
  setRoutineToEdit,
  setRoutineToDelete,
  activities,
  addActivity,
  setAddActivity,
  checked,
  setChecked,
  routineToAddActivity,
  setRoutineToAddActivity,
}) => {
  const [routineActivityId, setRoutineActivityId] = useState(0);

  if (!token) {
    return <div>Please Log in or Register!</div>;
  } else if (myroutines.length === 0) {
    return (
      <div>
        <div>No Routines</div>
        <div>
          <RoutineForm
            setRoutines={setRoutines}
            routines={routines}
            token={token}
          ></RoutineForm>
        </div>
      </div>
    );
  } else {
    return (
      <div id="myroutines">
        <h2 id="my-routines-page">My Routines</h2>
        <div id="form-and-myroutines">
          <div>
            <RoutineForm
              setRoutines={setRoutines}
              routines={routines}
              token={token}
            ></RoutineForm>
          </div>
          <div id="routineinfo">
            {myroutines.map((routine) => {
              return (
                <div id="individual-myroutine" key={routine.id}>
                  <p id="name-myroutines"> Name: {routine.name}</p>
                  <button
                    id="edit-button"
                    onClick={() => setRoutineToEdit(routine)}
                  >
                    <Link to="/updateroutine">Edit</Link>
                  </button>
                  <button
                    id="delete-button"
                    onClick={() => setRoutineToDelete(routine)}
                  >
                    Delete
                  </button>
                  <p>Goal: {routine.goal}</p>
                  <p>Author: {routine.creatorName}</p>
                  <div>
                    {routine.activities.map((activity) => {
                      return (
                        <div key={activity.id}>
                          <p id="myactivity-name">Activity: {activity.name}</p>
                          <p>Description: {activity.description}</p>
                          <p>Time: {activity.duration}</p>
                          <p>Count: {activity.count}</p>
                          <UpdateMyActivities
                            setRoutineActivityId={setRoutineActivityId}
                            token={token}
                            activity={activity}
                            routineActivityId={routineActivityId}
                          ></UpdateMyActivities>
                        </div>
                      );
                    })}
                  </div>
                  <Dropdown
                    activities={activities}
                    addActivity={addActivity}
                    setAddActivity={setAddActivity}
                    checked={checked}
                    setChecked={setChecked}
                    routineToAddActivity={routineToAddActivity}
                    setRoutineToAddActivity={setRoutineToAddActivity}
                    myRoutine={routine}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default MyRoutines;