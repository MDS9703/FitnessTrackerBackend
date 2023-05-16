const client = require("./client");

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
    throw new error;
  }
}

async function getRoutineActivityById(id) {
  const result = await client.query(
    `
    SELECT * FROM routine_activites
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

async function getRoutineActivitiesByRoutine({ id }) {
  const result = await client.query(
    `
    SELECT * FROM routine_activites
    WHERE routineId = $1
    `,
    [id]
  );

  return result.rows;
}

async function updateRoutineActivity({ id, count, duration }) {
  const result = await client.query(
    `
    UPDATE routine_activites
    SET count = $1, duration = $2
    WHERE id = $3
    RETURNING *
    `,
    [count, duration, id]
  );

  return result.rows[0];
}

async function destroyRoutineActivity(id) {
  const result = await client.query(
    `
    DELETE FROM routine_activites
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
