export async function GET(req: Request) {
  console.log(req.json());
  return Response.json({});
}
