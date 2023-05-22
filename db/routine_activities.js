const client = require("./client");


async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    SELECT * 
    FROM routine_activities
    WHERE id = $1
    `,
      [id]
    );

    return routineActivity;
  } catch (error) {
    throw new Error("Failed to get routine activity by id " + error.message);
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    INSERT INTO routine_activities ("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );
    return routineActivity;
  } catch (error) {
    throw new Error("Failed to add activity to routine " + error.message);
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(
      `
    SELECT * 
    FROM routine_activities
    WHERE "routineId" = $1
    `,
      [id]
    );

    return rows;
  } catch (error) {
    throw new Error("Failed to get routine activity by routine " + error.message);
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  const fieldKeys = Object.keys(fields);
  const fieldValues = Object.values(fields);

  const setString = fieldKeys
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length > 0) {
    const query = {
      text: `
        UPDATE routine_activities
        SET ${setString}
        WHERE id=$${fieldKeys.length + 1}
        RETURNING *;
      `,
      values: [...fieldValues, id],
    };

    try {
      const {
        rows: [routineActivity],
      } = await client.query(query);
      return routineActivity;
    } catch (error) {
      throw new Error("Failed to update routine activity: " + error.message);
    }
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    DELETE FROM routine_activities
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );

    return routineActivity;
  } catch (error) {
    throw new Error("Failed to destroy routine activity: " + error.message);
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const {
      rows: [editableRoutineActivity],
    } = await client.query(
      `
    SELECT routine_activities.*
    FROM routine_activities
    JOIN routines ON routines.id = routine_activities."routineId"
    WHERE routines."creatorId" = $1 AND routine_activities.id = $2
    `,
      [userId, routineActivityId]
    );
    return editableRoutineActivity;
  } catch (error) {
    throw new Error("Failed to edit routine activity: " + error.message);
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
