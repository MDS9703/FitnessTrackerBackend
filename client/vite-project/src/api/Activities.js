export const fetchActivities = async () => {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    const data = await response.json();
  
    // return data;
    return data;
  };
  
  export const addActivity = async (
    token,
    routineId,
    activityId,
    count,
    duration
  ) => {
    try {
      console.log( token,
        routineId,
        activityId,
        count,
        duration, "!!!!!!!!!!")
      const response = await fetch(
  
        `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            activityId: activityId,
            count: count,
            duration: duration,
          }),
        }
      );
      const data = await response.json();
      console.log(data, "data");
  
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const newActivity = async (token, name, description) => {
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            description: description,
          }),
        }
      );
      const data = await response.json();
      console.log(data, "data");
  
      return data;
    } catch (error) {
      console.error(error);
    }
  };