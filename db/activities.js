const client = require("./client");

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING *
      `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw new Error("Failed to create activity: " + error.message);
  }
}

// return the new activity

async function getAllActivities() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities
  `);

    return rows;
  } catch (error) {
    throw new Error("Failed to get all activities: " + error.message);
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
  SELECT *
  FROM activities
  WHERE id = $1
  `,
      [id]
    );

    return activity;
  } catch (error) {
    throw new Error("Failed to get activity by id: " + error.message);
  }
}

async function getActivityByName(name) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT *
    FROM activities
    WHERE name = $1
    `,
      [name]
    );

    return activity;
  } catch (error) {
    throw new Error("Failed to get activity by name: " + error.message);
  }
}

async function attachActivitiesToRoutines(routines) {
  const returnRoutines = [...routines];

  try {
    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.id AS "routineActivityId", routine_activities."routineId", routine_activities.duration, routine_activities.count
    FROM activities
    JOIN routine_activities ON routine_activities."activityId" = activities.id;
    `);
    for (const routine of returnRoutines) {
      const activitiesToAdd = activities.filter(
        (activity) => activity.routineId === routine.id
      );
      routine.activities = activitiesToAdd;
    }

    return returnRoutines;
  } catch (error) {
    throw new error("Failed to attach routines: " + error.message);
  }
}

async function updateActivity({ id, ...fields }) {
  const fieldKeys = Object.keys(fields);
  const fieldValues = Object.values(fields);

  // Construct the SET clause for updating fields
  const setString = fieldKeys
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length > 0) {
    const query = {
      text: `
        UPDATE activities
        SET ${setString}
        WHERE id=$${fieldKeys.length + 1}
        RETURNING *;
      `,
      values: [...fieldValues, id],
    };

    try {
      const {
        rows: [activity],
      } = await client.query(query);
      return activity;
    } catch (error) {
      throw new Error("Failed to update activity: " + error.message);
    }
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity
};
