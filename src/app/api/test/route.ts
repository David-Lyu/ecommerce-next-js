import DataAPI from "@/lib/api/data_adapter/index";

export async function GET(req: Request) {
  if (!req) {
    console.log(req);
  }
  (await DataAPI).getProducts(0, 0, [1, 2]);
  return Response.json({});
}
