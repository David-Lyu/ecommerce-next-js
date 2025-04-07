import DataAPI from "@/lib/api/data_adapter";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: props) {
  const id = Number((await params).id);
  //
  console.log(id);
  console.log(typeof id);
  if (isNaN(id)) notFound();
  const results = await (await DataAPI).getProduct(id);
  console.log(results);
  return (
    <section>
      <h3>Title</h3>
    </section>
  );
}
