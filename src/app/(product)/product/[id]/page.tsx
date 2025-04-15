import { ProductType } from "@/lib/api/data_adapter/models/products";
import { NextResponse } from "next/server";

type props = {
  params: Promise<{ id: string }>;
};
const Page = async ({ params }: props) => {
  const id = Number((await params).id);
  if (isNaN(id)) return NextResponse.json({ data: {} });
  const request = await fetch(
    `http://localhost:${process.env.PORT}/api/product?id=` + id,
    {
      headers: {
        "Content-Type": "application/json",
        route_token: process.env.ROUTE_HASH,
      },
    },
  );
  let results: ProductType | undefined;
  try {
    if (request.status === 200) {
      results = await request.json();
    } else {
      throw new Error("request status: " + request.status);
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <section>
      <h3>Title</h3>
      <p>{results?.name}</p>
    </section>
  );
};
export default Page;
