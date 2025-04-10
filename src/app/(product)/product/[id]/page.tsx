import { NextResponse } from "next/server";

type props = {
  params: Promise<{ id: string }>;
};
const Page = async ({ params }: props) => {
  const id = Number((await params).id);
  if (isNaN(id)) return NextResponse.error();
  const request = await fetch(
    `http://localhost:${process.env.PORT}/api/product?id=` + id,
    {
      headers: {
        "Content-Type": "application/json",
        route_token: process.env.ROUTE_HASH,
      },
    },
  );
  let results = {};
  try {
    if (request.status === 200) {
      results = await request.json();
    } else {
      throw new Error("request status: " + request.status);
    }
  } catch (err) {
    console.error(err);
  }
  console.log(results);

  return (
    <section>
      <h3>Title</h3>
    </section>
  );
};
export default Page;
