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
  // select and return an array of all activities
}

async function getActivityById(id) {
  const result = await client.query(
    `
  SELECT *
  FROM activites
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

async function getActivityByName(name) {}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
