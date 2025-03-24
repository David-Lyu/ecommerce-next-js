import DataAPI from "@/lib/api/adapter/client";

let hasInit = false;
export async function GET(req: Request) {
  console.log(req.body);
  if (!hasInit) {
    console.log("Intializing Database");
    DataAPI.initialize();
    hasInit = true;
  } else {
    //redirect to homepage
  }
  return Response.json({});
}
