import SQLiteDB from "../db/sqlite/init";
import BackendAdapter from "./models/adapter";

// Where we initialize our connection to grab data
enum API_TYPE {
  SQLITE = "sqlite",
  THIRD_PARTY = "THIRD_PARTY",
}

export default function init(): BackendAdapter | Error {
  let adapter: BackendAdapter;
  //get .env here
  switch (process.env.API_TYPE as API_TYPE) {
    case API_TYPE.SQLITE:
      adapter = new SQLiteDB();
      break;
    case API_TYPE.THIRD_PARTY:
    //init third party data fetching here:
    // would need env variables for users, products etc. Should need to be in shape of db expects types
    default:
      throw new Error("we have not implemented that type");
  }
  return adapter;
}
