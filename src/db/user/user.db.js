import { toCamelCase } from "../../../utils/response/transformCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";
import bcrypt from "bcrypt";

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
export const updateUserData = async (userId, updateData) => {
  try {
    const fields = [];
    const values = [];

    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (updateData.nickName) {
      fields.push("nickName = ?");
      values.push(updateData.nickName);
    }

    if (fields.length === 0) return false; // 변경할 항목이 없음

    const query = `UPDATE User SET ${fields.join(", ")} WHERE userId = ?`;
    values.push(userId);

    const [rows] = await pools.USER_DB.query(query, values);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("회원 정보 수정 ERROR:", err);
    return false;
  }
};

export const deleteUserData = async (userId) => {
  try {
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.DELETE_USER, [userId]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("회원 탈퇴 ERROR:", err);
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
