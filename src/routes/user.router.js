import express from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  deleteUserData,
  findUserById,
  findUserByName,
  updateUserData,
  updateUserLogin,
} from "../db/user/user.db.js";

const router = express.Router();

/**
 * @desc 회원가입 API
 */

router.post("/sign-up", async (req, res) => {
  try {
    // 요청값
    const { userId, password, passwordCheck, nickName } = req.body;

    //동일 아이디, 닉네임 조회
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
    console.error("회원가입 에러:", err);
    return res.status(500).json({ message: "회원가입 처리 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 로그인 API
 */

router.post("/sign-in", async (req, res) => {
  try {
    // 요청값
    const { userId, password } = req.body;

    //아이디 조회
    const user = await findUserById(userId);

    //유효성 검사
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 아이디 입니다." });
    }

    const decodedPassword = await bcrypt.compare(password, user.password);
    if (!decodedPassword) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }
    //로그인 정보 갱신
    await updateUserLogin(userId);
    return res.status(200).json({
      message: "로그인에 성공했습니다.",
      userId: user.userId,
      nickName: user.nickName,
    });
  } catch (err) {
    console.error("로그인 에러:", err);
    return res.status(500).json({ message: "로그인 처리 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 회원정보 수정 API
 */

router.patch("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword, newNickName } = req.body;

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 사용자입니다." });
    }

    // 닉네임 중복 체크
    if (newNickName) {
      if (newNickName === user.nickName) {
        return res.status(409).json({ message: "현재 사용중인 이름 입니다." });
      }

      const currentUserName = await findUserByName(newNickName);
      if (currentUserName) {
        return res.status(409).json({ message: "이미 존재하는 이름 입니다." });
      }
    }

    // 비밀번호 확인
    const passwordCheck = await bcrypt.compare(currentPassword, user.password);
    if (!passwordCheck) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }

    // 동적 업데이트 적용
    const updated = await updateUserData(userId, {
      password: newPassword,
      nickName: newNickName,
    });

    return res.status(200).json({ message: "회원정보 수정에 성공했습니다." });
  } catch (err) {
    console.error("회원정보 수정 에러:", err);
    return res.status(500).json({ message: "회원정보 수정 처리 중 오류가 발생했습니다." });
  }
});

/**
 * @desc 회원탈퇴 API
 */

router.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 사용자입니다." });
    }

    // 비밀번호 확인
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }

    await deleteUserData(userId);
    return res.status(200).json({ message: "계정이 삭제되었습니다." });
  } catch (err) {
    console.error("회원정보 삭제 에러:", err);
    return res.status(500).json({ message: "회원정보 삭제 처리 중 오류가 발생했습니다." });
  }
});

export default router;
