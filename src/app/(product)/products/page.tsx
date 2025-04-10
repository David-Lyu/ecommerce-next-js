import { ProductListType } from "@/lib/api/data_adapter/models/products";

const Page = async () => {
  let results: ProductListType | undefined;
  try {
    const request = await fetch(
      `http://localhost:${process.env.PORT}/api/products`,
      {
        headers: {
          "Content-Type": "application/json",
          route_token: process.env.ROUTE_HASH,
        },
      },
    );
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
    <div>
      Hello <p>world</p>
    </div>
  );
};
export default Page;
