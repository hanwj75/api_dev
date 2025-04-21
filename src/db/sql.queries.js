export const SQL_QUERIES = {
  //user
  FIND_USER_BY_ID: "SELECT * FROM User WHERE userId = ?",
  FIND_USER_BY_NAME: "SELECT * FROM User WHERE nickName = ?",
  CREATE_USER: "INSERT INTO User (userId,nickName, password) VALUES (?,?,?)",
  UPDATE_USER_LOGIN: "UPDATE User SET updatedAt = CURRENT_TIMESTAMP WHERE userId = ?",
  DELETE_USER: "DELETE FROM User WHERE userId = ?",

  //post
  FIND_POST_BY_ID: "SELECT * FROM Post WHERE id = ?",
  FIND_ALL_POSTS: "SELECT * FROM Post",
  CREATE_POST: "INSERT INTO Post (userId, title, content) VALUES (?,?,?)",
  UPDATE_POST: "UPDATE Post SET title = ?, content = ? WHERE id = ?",
  DELETE_POST: "DELETE FROM Post WHERE id = ?",
};
