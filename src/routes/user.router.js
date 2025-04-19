import express from "express";

const router = express.Router();

/**
 * @desc 회원가입 API
 */

router.post("/signup", (req, res) => {
  try {
    // 요청값
    const { userId, password, passwordCheck, nickName } = req.body;
  } catch (err) {
    console.log("회원가입 에러", err);
  }
});

/**
 * @desc 로그인 API
 */

/**
 * @desc 회원정보 수정 API
 */

export default router;
