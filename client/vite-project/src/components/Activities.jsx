import React, { useEffect, useState } from "react";

import { fetchActivities } from "../api/Activities";

import SingleActivity from "./SingleActivity";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getAllActivities = async () => {
      const AllActivities = await fetchActivities();
      setActivities(AllActivities);
    };
    getAllActivities();
  });

  return (
    <div>
      <>
        <h1>Activities</h1>
        {activities
          ? activities.map((activity, i) => {
              return (
                <SingleActivity
                  activity={activity}
                  i={i}
                  activities={activities}
                  setActivities={setActivities}
                />
              );
            })
          : null}
      </>
    </div>
  );
};

export default Activities;