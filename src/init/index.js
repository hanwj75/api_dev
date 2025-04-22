import { testAllConnections } from "../utils/db/testConnection.js";
import pools from "../db/database.js";

//서버 실행전 사전작업
const initServer = async () => {
  try {
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
