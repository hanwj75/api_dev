import { toCamelCase } from "../../../utils/response/transformCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";

/**
 * @desc 유저 조회, 생성, 수정, 삭제, 로그인 정보 갱신
 */

export const findUserById = async (userId) => {
  try {
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [userId]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error("회원 조회 ERROR:", err);
  }
};

export const findUserByName = async (nickName) => {
  try {
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_NAME, [nickName]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error("회원 조회 ERROR:", err);
  }
};

export const createUser = async (userId, nickName, password) => {
  try {
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [userId, nickName, password]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error("회원가입 ERROR:", err);
  }
};

export const updateUserData = async (userId, newPassword) => {
  try {
    //새로 생성한 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_DATA, [newPassword, userId]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("비밀번호 수정 ERROR:", err);
  }
};

export const updateUserLogin = async (userId) => {
  try {
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [userId]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error("로그인 정보 갱신 ERROR:", err);
  }
};
