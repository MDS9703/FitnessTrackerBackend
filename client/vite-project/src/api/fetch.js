import { faCropSimple } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5432/api";

export const publicRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const myRoutines = async (token, username) => {
  try {
    const response = await fetch(`${API_URL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const routines = await response.json();

    return routines;
  } catch (error) {
    console.error(error);
  }
};

export const createNewRoutine = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${API_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const newRoutine = await response.json();
    console.log("this is new ROutine", newRoutine);
    return newRoutine;
  } catch (error) {
    console.error(error);
  }
};

export const patchUpdateRoutine = async (
  token,
  routineToEdit,
  name,
  goal,
  isPublic
) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const updatedRoutine = await response.json();
    console.log("this is updatedRoutine in fetch", updatedRoutine);
    return updatedRoutine;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDeleteRoutine = async (token, routineToDelete) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineToDelete.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const routinesWithoutDeletedOne = await response.json();
    return routinesWithoutDeletedOne;
  } catch (error) {
    console.error(error);
  }
};

export const fetchActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const attachActivitiesToRoutine = async (
  routineToAddActivityId,
  activityId,
  token
) => {
  try {
    const response = await fetch(
      `${API_URL}/routines/${routineToAddActivityId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId,
        }),
      }
    );
    const results = await response.json();
    console.log("this is results in attachActivitiesToRoutine", results);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const updateCountAndDuration = async (
  token,
  routineActivityId,
  count,
  duration
) => {
  console.log("this is token", token)
  console.log("this is routineActivityId in updateCountandDUration", routineActivityId)
  try {
    const response = await fetch(
      `${API_URL}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const results = await response.json();
    console.log("this is results in update count", results);
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const removeActivityfromRoutine = async (token, routineActivityId) => {
  try {
    const response = await fetch(`${API_URL}/routine_activities/${routineActivityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    const results = await response.json();
    console.log("you deleted results", results);
  } catch (error) {
    console.error(error)
  }
}

export const createNewActivity = async (token, name, description) => {
  try {
    const response = await fetch(`${API_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify (
        {
          name,
          description,
        }
      ) 
    })
    const results = await response.json();
    return results
  } catch (error) {
    console.error(error);
  }
}