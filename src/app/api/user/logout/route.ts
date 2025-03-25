export async function GET(req: Request) {
  req.formData();

  req.json();

  Response.json({});
}
