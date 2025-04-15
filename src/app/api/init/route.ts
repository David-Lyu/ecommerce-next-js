import DataAPI from "@/lib/api/data_adapter/index";

let hasInit = false;
// eslint-disable-next-line
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.redirect("/");
  }
  let message = "";
  if (!hasInit) {
    console.log("Intializing Database");
    DataAPI.initialize();
    hasInit = true;
    message = "Database Intialized";
  } else {
    message = "Database already Initialized";
  }
  return Response.json({ message });
}
