import * as communityService from "../services/communityService.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await communityService.getPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;
    const post = await communityService.createPost(userId, content);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = Number(req.params.postId);
    const { content } = req.body;
    const updatedPost = await communityService.updatePost(
      userId,
      postId,
      content
    );
    if (!updatedPost) {
      return res.status(403).json({ message: "Forbidden or post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = Number(req.params.postId);
    const success = await communityService.deletePost(userId, postId);
    if (!success) {
      return res.status(403).json({ message: "Forbidden or post not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const getCommentsForPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    const comments = await communityService.getCommentsForPost(postId);
    if (comments === null) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = Number(req.params.postId);
    const { text } = req.body;
    const comment = await communityService.addComment(userId, postId, text);
    if (!comment) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const commentId = Number(req.params.commentId);
    const { text } = req.body;
    const updatedComment = await communityService.updateComment(
      userId,
      commentId,
      text
    );
    if (!updatedComment) {
      return res
        .status(403)
        .json({ message: "Forbidden or comment not found" });
    }
    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const commentId = Number(req.params.commentId);
    const success = await communityService.deleteComment(userId, commentId);
    if (!success) {
      return res
        .status(403)
        .json({ message: "Forbidden or comment not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
