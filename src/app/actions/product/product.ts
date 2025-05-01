"use server";

import { ProductListType } from "@/lib/api/data_adapter/models/products";

export async function getProductsAction(
  limit: number,
  offset: number,
  tagList: number[],
) {
  let productList: ProductListType = [];
  try {
    const productsRequestInfo = {
      headers: {
        "Content-Type": "application/json",
        route_token: process.env.ROUTE_HASH,
      },
    };
    let url = "http://localhost:3000/api/products?";

    if (limit) {
      url += `limit=${limit}`;
      if (offset) {
        url += `&offset=${offset}`;
      }
    }

    if (tagList.length) url += "&";
    tagList.forEach((id, i) => {
      // Appends the & if not end of tagList
      url += `tag=${id}` + (i <= tagList.length ? "&" : "");
    });

    const response = await fetch(url, productsRequestInfo);
    if (response.ok) {
      productList = ((await response.json()) as { data: ProductListType }).data;
    } else {
      throw Error(`Response status: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
  }
  return productList;
}
