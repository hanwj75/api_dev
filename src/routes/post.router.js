import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  findAllPost,
  findPostById,
  updatePostData,
} from "../db/post/post.db.js";

const router = express.Router();

/**
 * @desc 게시물 작성 API
 */

router.post("/posts", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { title, content } = req.body;
    await createPost(userId, title, content);

    return res.status(201).json({
      message: "게시물이 작성되었습니다.",
      title,
      content,
    });
  } catch (err) {
    console.error("게시물 작성 중 오류가 발생했습니다", err);
  }
});

/**
 * @desc 전체 게시물 조회 API
 */

router.get("/posts", async (req, res, next) => {
  try {
    const posts = await findAllPost();

    return res.status(200).json({
      message: "게시물 조회 성공",
      posts,
    });
  } catch (err) {
    console.error("게시물 조회 중 오류가 발생했습니다", err);
    return res.status(500).json({ message: "게시물 조회 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 특정 게시물 조회 API
 */

router.get("/posts/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await findPostById(postId);

    if (!post) {
      return res.status(404).json({ message: "게시물이 존재하지 않습니다." });
    }

    return res.status(200).json({
      message: "게시물 조회 성공",
      post,
    });
  } catch (err) {
    console.error("특정 게시물 조회 중 오류가 발생했습니다", err);
    return res.status(500).json({ message: "특정 게시물 조회 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 게시물 수정 API
 */

router.patch("/posts/:postId", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await findPostById(postId);

    //유효성 검사
    if (!title && !content) {
      return res.status(400).json({ message: "수정할 내용이 없습니다." });
    }

    if (!post) {
      return res.status(404).json({ message: "게시물이 존재하지 않습니다." });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: "게시물 수정 권한이 없습니다." });
    }
    await updatePostData(postId, { title, content });
    return res.status(200).json({
      message: "게시물 수정 성공",
      postId,
      title,
      content,
    });
  } catch (err) {
    console.error("게시물 수정 중 오류가 발생했습니다", err);
    return res.status(500).json({ message: "게시물 수정 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 게시물 삭제 API
 */

router.delete("/posts/:postId", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const post = await findPostById(postId);

    //유효성 검사
    if (!post) {
      return res.status(404).json({ message: "게시물이 존재하지 않습니다." });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: "게시물 삭제 권한이 없습니다." });
    }
    await deletePost(postId);
    return res.status(200).json({
      message: "게시물 삭제 성공",
      postId,
    });
  } catch (err) {
    console.error("게시물 삭제 중 오류가 발생했습니다", err);
    return res.status(500).json({ message: "게시물 삭제 중 오류가 발생했습니다." });
  }
});

export default router;
