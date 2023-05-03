const id = require("faker/lib/locales/id_ID");
const client = require("./client");
const bcrypt = require("bcrypt");

// database functions

// user functions
async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const result = await client.query(
    `
  INSERT INTO users (username, password)
  VALUES ($1, $2)
  RETURNING id, username
  `,
    [username, hashedPassword]
  );
  return result.rows[0];
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword);

  if (isValid) {
    return user;
  } else {
    return null;
  }
}

async function getUserById(userId) {
  const result = await client.query(
    `
  SELECT id, username
  FROM users
  WHERE id = $1
  `,
    [userId]
  );

  if (result.rows.length > 0) {
    const user = result.rows[0];
    delete user.password;
    return user;
  } else {
    return null;
  }
}

async function getUserByUsername(userName) {
  const result = await client.query(
    `
    SELECT id, username
    FROM users
    WHERE username = $1
     `,
    [userName]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
