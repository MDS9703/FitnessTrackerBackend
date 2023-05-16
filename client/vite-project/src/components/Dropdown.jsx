import React, { useState } from "react";
import { PublicActivities } from "./index";

const Dropdown = ({
  activities,
  addActivity,
  setAddActivity,
  checked,
  setChecked,
  routineToAddActivity,
  setRoutineToAddActivity,
  myRoutine,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const submitHandler = async (e) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setRoutineToAddActivity(myRoutine);
    console.log("this is checked activities", checked);
  };

  const redirMyRoutines = () => {
    window.location.href = "/myroutines";
  };

  return (
    <div id="dropdown">
      <button id="myactivities-button" onClick={handleOpen}>Activities</button>
      {open ? (
        <form>
          <div id="dropdown-activities">
            {activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <p>Name: {activity.name} </p>
                  <input
                    id="dropdown-checkbox"
                    type="checkbox"
                    value={activity.id}
                    name={activity.name}
                    onChange={submitHandler}
                  ></input>
                </div>
              );
            })}
          </div>
          <button id="add-activities">Add</button>
        </form>
      ) : null}
    </div>
  );
};

export default Dropdown;