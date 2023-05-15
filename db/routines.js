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
  try {
    const routines = await Routine.find({ isPublic: true }).populate('activities');

    return routines;
  } catch (error) {
    throw new Error(`Failed to get all public routines: ${error.message}`);
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const routines = await Routine.find({ username }).populate('activities');

    return routines;
  } catch (error) {
    throw new Error(`Failed to get routines for user ${username}: ${error.message}`);
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const routines = await Routine.find({ username, isPublic: true }).populate('activities');

    return routines;
  } catch (error) {
    throw new Error(`Failed to get public routines for user ${username}: ${error.message}`);
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const routines = await Routine.find({ activity: id, isPublic: true }).populate('activities');

    if (!routines) {
      throw new Error(`No public routines found for activity with ID ${id}`);
    }

    return routines;
  } catch (error) {
    throw new Error(`Failed to get public routines for activity with ID ${id}: ${error.message}`);
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const routine = await Routine.findById(id).populate('activities');

    if (!routine) {
      throw new Error(`Routine not found with ID ${id}`);
    }

    Object.assign(routine, fields);

    const updatedRoutine = await routine.save();

    return updatedRoutine.populate('activities');
  } catch (error) {
    throw new Error(`Failed to update routine with ID ${id}: ${error.message}`);
  }
}

async function destroyRoutine(id) {
  try {
    const routine = await Routine.findById(id).populate('activities');

    if (!routine) {
      throw new Error('Routine not found');
    }

    await Routine.deleteOne({ _id: id });

    const allRoutines = await Routine.find().populate('activities');
    return allRoutines;
  } catch (error) {
    throw new Error(`Failed to destroy routine with ID ${id}: ${error.message}`);
  }
}

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
