import DataAPI from "@/lib/api/adapter/client";

export async function GET(req: Request, res: Response) {
  // check if req.json() is truthy
  const body = req.method == "GET";
  console.log(body);
  const data = DataAPI.getProduct();
  console.log(data);
  res.json();
}
