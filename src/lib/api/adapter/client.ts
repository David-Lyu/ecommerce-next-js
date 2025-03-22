// Where we initialize our connection to grab data
enum API_TYPE {
  SQLITE = "sqlite",
  THIRD_PARTY = "THIRD_PARTY",
}

export default function init() {
  //get .env here
  switch (process.env.API_TYPE as API_TYPE) {
    case API_TYPE.SQLITE:
      break;
    case API_TYPE.THIRD_PARTY:
    //init third party data fetching here:
    // would need env variables for users, products etc. Should need to be in shape of db expects types
    default:
      console.log("we have not implemented that type");
  }
}
