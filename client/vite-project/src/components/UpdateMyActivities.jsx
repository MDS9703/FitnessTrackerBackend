import React, { useState } from "react";
import { updateCountAndDuration, removeActivityfromRoutine } from "../api/Fetch";

const UpdateMyActivities = ({
  token,
  //routineActivityId,

  setRoutineActivityId,
  activity,
}) => {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  
  const redirMyRoutines = () => {
    window.location.href = "/myroutines";
  };

  console.log("this is activity", activity);
  const routineActivityId = activity.routineActivityId

  return (
    <div id="updateDropdown">
      <button id="update-myactivities-button" onClick={handleOpenDropdown}>Update Activities</button>
      {openDropdown ? (
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              console.log("this is routineActivityId", routineActivityId);
              await updateCountAndDuration(
                token,
                routineActivityId,
                count,
                duration,
              );
              redirMyRoutines();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div>
            <input
              id="count"
              value={count}
              type="number"
              placeholder="Count"
              onChange={(event) => setCount(event.target.value)}
            ></input>
            <input
              id="duration"
              value={duration}
              type="number"
              placeholder="Duration"
              onChange={(event) => setDuration(event.target.value)}
            ></input>
            <button id="countSubmit" type="submit">
              Update
            </button>
          </div>
        </form>
      ) : null}
      <button id="activity-delete" onClick={()=>removeActivityfromRoutine(token, routineActivityId) && redirMyRoutines()}>Remove Activity</button>
    </div>
  );
};

export default UpdateMyActivities;