import DataAPI from "@/lib/api/data_adapter/client";

export async function GET(req: Request) {
  // check if req.json() is truthy
  const body = req.method == "GET";
  console.log(body);
  const data = DataAPI.getProduct();
  console.log(data);
  return Response.json({});
}
