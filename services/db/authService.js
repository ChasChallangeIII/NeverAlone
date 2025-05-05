import bcrypt from "bcryptjs";
import { executeQuery } from "./db.js";
import {
  AdminNotFoundError,
  DeleteUserError,
  DuplicateUserError,
  PasswordError,
  UserNotFoundError,
} from "../../utils/errors/authErrors.js";

export const addUser = async (userData) => {
  const { username, email, password, gender, birthDate } = userData;

  const isUniqueUser = await ensureUniqueUser(username, email);

  if (!isUniqueUser) {
    throw new DuplicateUserError();
  }

  const query = `
    INSERT INTO users (username, email, password_hash, gender, birth_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username, email;
  `;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await executeQuery(query, [username, email, hashedPassword, gender, birthDate]);

  return newUser[0];
};

export const performLogin = async (userData) => {
  const { username, email, password } = userData;

  // console.log(username, email);

  // const users = await executeQuery("SELECT * FROM users");

  // console.log(users);

  const query = `
    SELECT 
        id, 
        username, 
        email, 
        password_hash
    FROM users
    WHERE LOWER(username) = TRIM(LOWER($1)) OR LOWER(email) = TRIM(LOWER($2));
  `;

  const result = await executeQuery(query, [username, email]);

  if (result.length === 0) {
    throw new UserNotFoundError();
  }

  const user = result[0];

  const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordMatch) {
    throw new PasswordError();
  }

  return user;
};

export const performAdminLogin = async (adminData) => {
  const { username, password } = adminData;

  const query = `
    SELECT 
        id, 
        username, 
        password_hash
    FROM admins
    WHERE LOWER(username) = TRIM(LOWER($1));
  `;

  const result = await executeQuery(query, [username]);

  if (result.length === 0) {
    throw new AdminNotFoundError();
  }

  const admin = result[0];

  const isPasswordMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isPasswordMatch) {
    throw new PasswordError();
  }

  return admin;
};

export const deleteAccount = async (userId, deleteCommand = "") => {
  const findQuery = `
    SELECT * FROM users
    WHERE id = $1
  `;

  const findResult = await executeQuery(findQuery, [userId]);

  if (findResult.length === 0) {
    throw new UserNotFoundError();
  }

  const user = findResult[0];

  const [key, username] = deleteCommand.toLowerCase().split("delete");

  if (key !== "delete" || user.username.toLowerCase() !== username) {
    throw new DeleteUserError();
  }

  const deleteQuery = `
    DELETE FROM users
    WHERE id = $1
  `;

  await executeQuery(deleteQuery, [userId]);
};

export const ensureUniqueUser = async (username, email) => {
  const query = `
    SELECT * FROM users
    WHERE LOWER(username) = TRIM(LOWER($1)) OR LOWER(email) = TRIM(LOWER($2)); 
  `;

  const result = await executeQuery(query, [username, email]);

  return result.length === 0;
};
