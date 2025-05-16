import { executeQuery } from "./db/db.js";

export const getPosts = async () => {
  const query = `SELECT * FROM posts ORDER BY created_at DESC`;
  return await executeQuery(query);
};

export const createPost = async (userId, content) => {
  const query = `
    INSERT INTO posts (user_id, content)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await executeQuery(query, [userId, content]);
  return result[0];
};

export const updatePost = async (userId, postId, content) => {
  const query = `
    UPDATE posts
    SET content = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;
  const result = await executeQuery(query, [content, postId, userId]);
  return result[0] || null;
};

export const deletePost = async (userId, postId) => {
  const query = `
    DELETE FROM posts
    WHERE id = $1 AND user_id = $2
    RETURNING id;
  `;
  const result = await executeQuery(query, [postId, userId]);
  return result.length > 0;
};

export const getCommentsForPost = async (postId) => {
  const checkPost = await executeQuery("SELECT id FROM posts WHERE id = $1", [
    postId,
  ]);
  if (checkPost.length === 0) return null;

  const query = `
    SELECT * FROM comments
    WHERE post_id = $1
    ORDER BY created_at ASC;
  `;
  return await executeQuery(query, [postId]);
};

export const addComment = async (userId, postId, text) => {
  const checkPost = await executeQuery("SELECT id FROM posts WHERE id = $1", [
    postId,
  ]);
  if (checkPost.length === 0) return null;

  const query = `
    INSERT INTO comments (user_id, post_id, text)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await executeQuery(query, [userId, postId, text]);
  return result[0];
};

export const updateComment = async (userId, commentId, text) => {
  const query = `
    UPDATE comments
    SET text = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;
  const result = await executeQuery(query, [text, commentId, userId]);
  return result[0] || null;
};

export const deleteComment = async (userId, commentId) => {
  const query = `
    DELETE FROM comments
    WHERE id = $1 AND user_id = $2
    RETURNING id;
  `;
  const result = await executeQuery(query, [commentId, userId]);
  return result.length > 0;
};
