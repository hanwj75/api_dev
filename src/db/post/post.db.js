import { toCamelCase } from "../../utils/response/transformCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "../sql.queries.js";

export const findAllPost = async () => {
  try {
    const [rows] = await pools.POST_DB.query(SQL_QUERIES.FIND_ALL_POSTS);
    return rows.map((row) => toCamelCase(row));
  } catch (err) {
    console.error("전체 게시물 조회 ERROR:", err);
  }
};

export const findPostById = async (id) => {
  try {
    const [rows] = await pools.POST_DB.query(SQL_QUERIES.FIND_POST_BY_ID, [id]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error("특정 게시물 조회 ERROR:", err);
  }
};

export const createPost = async (userId, title, content) => {
  try {
    const [rows] = await pools.POST_DB.query(SQL_QUERIES.CREATE_POST, [userId, title, content]);
    return toCamelCase(rows[0]);
  } catch (err) {
    console.error("게시물 생성 ERROR:", err);
  }
};

export const updatePostData = async (postId, postData) => {
  try {
    const fields = [];
    const values = [];

    if (postData.title) {
      fields.push("title = ?");
      values.push(postData.title);
    }

    if (postData.content) {
      fields.push("content = ?");
      values.push(postData.content);
    }

    if (fields.length === 0) return false; // 변경할 항목이 없음

    const query = `UPDATE Post SET ${fields.join(", ")} WHERE id = ?`;
    values.push(postId);

    const [rows] = await pools.POST_DB.query(query, values);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("게시물 수정 ERROR:", err);
    return false;
  }
};

export const deletePost = async (postId) => {
  try {
    const [rows] = await pools.POST_DB.query(SQL_QUERIES.DELETE_POST, [postId]);
    return rows.affectedRows > 0;
  } catch (err) {
    console.error("게시물 삭제 ERROR:", err);
    return false;
  }
};
