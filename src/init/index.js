import { testAllConnections } from "../../utils/db/testConnection.js";
import pools from "../db/database.js";

const initServer = async () => {
  try {
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
