import React from "react";
import ActivityForm from "./ActivityForm";

const PublicActivities = ({ token, activities }) => {
  return (
    <div id="activities">
      <h2 id="activitieslabel">Activities</h2>
      <div id="form-and-activities">
      <ActivityForm token={token} activities={activities}></ActivityForm>
      <div id="activities-box">
        {activities.map((activity) => {
          return (
            <div id="activity-details" key={activity.id}>
              <p id="activity-name">Name: {activity.name} </p>
              <p>Description: {activity.description} </p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default PublicActivities;