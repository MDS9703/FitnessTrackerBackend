import React from "react";

const PublicRoutines = ({ routines }) => {
  return (
    <div id="public-routines">
      <h2 id="routinelabel">Routines</h2>
      <div id="routines">
        {routines.map((routine) => {
          return (
            <div id="individual-routine" key={routine.id}>
              <p id="name-publicroutines">Name: {routine.name}</p>
              <p>Goal: {routine.goal}</p>
              <p>Author: {routine.creatorName}</p>

              <div>
                {routine.activities.map((activity) => {
                  return (
                    <div key={activity.id}>
                      <p id="activity-name">Activity: {activity.name}</p>
                      <p>Description: {activity.description}</p>
                      <p>Time: {activity.duration}</p>
                      <p>Count: {activity.count}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicRoutines;