const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  const result = await client.query(`
  INSERT INTO routines (creatorId, isPublic, name, goal)
  VALUES ($1, $2, $3, $4)
  RETURNING id, creatorId, isPublic, name, goal
  `, [creatorId, isPublic, name, goal]);

  return result.rows[0];
}

async function getRoutineById(id) {
  try {
    const routine = await Routine.findById(id);

    if (!routine) {
      throw new Error('Routine not found');
    }

    return routine;
  } catch (error) {
    throw new Error(`Failed to get routine with ID ${id}: ${error.message}`);
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const routines = await Routine.find({ activities: { $exists: false } });

    return routines;
  } catch (error) {
    throw new Error(`Failed to get routines without activities: ${error.message}`);
  }
}

async function getAllRoutines() {
  try {
    const routines = await Routine.find().populate('activities');

    return routines;
  } catch (error) {
    throw new Error(`Failed to get all routines: ${error.message}`);
  }
}

async function getAllPublicRoutines() {
  
}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
