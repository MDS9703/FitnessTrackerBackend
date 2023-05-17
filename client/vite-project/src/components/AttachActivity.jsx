import React, { useState } from "react";
import { addActivity } from "../api/Activities";

const AttachActivity = ({ routineId, activities }) => {
  const [count, setCount] = useState([]);
  const [duration, setDuration] = useState([]);
  const [activityId, setActivityId] = useState(null);
  const token = localStorage.getItem("token");
  return (
    <div>
      <form
        className="postCard"
        onSubmit={async (e) => {
          e.preventDefault();
         await addActivity(token, routineId, activityId, count, duration);
        }}
      >
        <h2>Add Activity</h2>
        <div>Select activity</div>

        <select
          onChange={(e) => {
            e.preventDefault();
            setActivityId(e.target.value);
          }}
        >
          {activities.map((activity) => {
            return (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>
        <input
          className="count"
          type="text"
          placeholder="count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        ></input>
        <input
          className="duration"
          type="text"
          placeholder="duration"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        ></input>

        <div className="cardBtn">
          <button type="submit">Add Activity</button>
        </div>
      </form>
    </div>
  );
};

export default AttachActivity;