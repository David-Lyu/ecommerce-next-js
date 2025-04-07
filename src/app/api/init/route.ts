import DataAPI from "@/lib/api/data_adapter/index";

let hasInit = false;
// eslint-disable-next-line
export async function GET(req: Request) {
  let message = "";
  if (!hasInit) {
    console.log("Intializing Database");
    await DataAPI.initialize();
    hasInit = true;
    message = "Database Intialized";
    console.log("Starting CRON for auto-rotating internal hash routes");
  } else {
    message = "Database already Initialized";
  }
  return Response.json({ message });
}
