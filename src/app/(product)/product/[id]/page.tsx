import routeAuth from "@/lib/auth/route_auth";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: props) {
  const id = Number((await params).id);
  //
  if (isNaN(id)) notFound();
  const request = await fetch(
    `http://localhost:${process.env.PORT}/api/product?id=` + id,
    {
      headers: {
        "Content-Type": "application/json",
        route_token: routeAuth.authHash,
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
}
