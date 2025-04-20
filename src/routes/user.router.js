import express from "express";
import bcrypt from "bcrypt";
import { createUser, findUserById, findUserByName } from "../db/user/user.db.js";

const router = express.Router();

/**
 * @desc 회원가입 API
 */

router.post("/sign-up", async (req, res) => {
  // 요청값
  const { userId, password, passwordCheck, nickName } = req.body;
  try {
    //동일 아이디, 닉네임 조회회
    const userIdCheck = await findUserById(userId);

    const nickNameCheck = await findUserByName(nickName);

    //유효성 검사
    if (userIdCheck) {
      return res.status(409).json({ message: "이미 존재하는 아이디 입니다." });
    }
    if (nickNameCheck) {
      return res.status(409).json({ message: "이미 존재하는 이름 입니다." });
    }
    if (password !== passwordCheck) {
      return res.status(409).json({ message: "비밀번호가 다릅니다." });
    }

    //비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    //회원 데이터 추가
    await createUser(userId, nickName, hashedPassword);

    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      userId,
      nickName,
    });
  } catch (err) {
    console.error("회원가입 에러", err);
    return res.status(500).json({ message: "회원가입 처리 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 로그인 API
 */

/**
 * @desc 회원정보 수정 API
 */

export default router;
