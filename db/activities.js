const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  const result = await client.query(
    `
  INSERT INTO activities (name, description)
  Values ($1, $2)
  RETURNING id, name
  `,
    [name, description]
  );

  return result.rows[0];
}

async function getAllActivities() {
  const result = await client.query(`
    SELECT id, name, description
    FROM activities
  `);

  return result.rows;
}

async function getActivityById(id) {
  const result = await client.query(
    `
  SELECT *
  FROM activities
  WHERE id = $1
  `,
    [id]
  );

  if (result.rows.length > 0) {
    const { id, name, description } = result.rows[0];
    return { id, name, description };
  } else {
    return null;
  }
}

async function getActivityByName(name) {
  const result = await client.query(
    `
    SELECT *
    FROM activities
    WHERE name = $1
    `,
    [name]
  );

  if (result.rows.length > 0) {
    const { id, name, description } = result.rows[0];
    return { id, name, description };
  } else {
    return null;
  }
}

// async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // Extract the fields to be updated
  const { name, description } = fields;

  // Update the activity in the database
  const result = await client.query(
    `
    UPDATE activities
    SET name = $1, description = $2
    WHERE id = $3
    RETURNING id, name, description
    `,
    [name, description, id]
  );

  // Return the updated activity
  if (result.rows.length > 0) {
    const { id, name, description } = result.rows[0];
    return { id, name, description };
  } else {
    return null;
  }
}

async function clearActivitiesData() {
  try {
    await client.query("DELETE FROM activities");
    console.log("Activities data cleared successfully.");
  } catch (error) {
    console.error("Error clearing activities data:", error);
  } finally {
    client.end();
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  // attachActivitiesToRoutines,
  createActivity,
  updateActivity,
  clearActivitiesData,
};
