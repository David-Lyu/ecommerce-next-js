import { open } from "sqlite";
import sqlite from "sqlite3";
import products from "../fakestoreapi.json" with { type: "json" };
/*
Product type:
"id": number,
"title": string,
"price": number,
"description": string,
"category": string,
"image": string, // Omit
"rating": {
  "rate": number,
  "count": number.  // Omit
  }
*/
const tagList = {
  "men's clothing": 0,
  jewelery: 0,
  electronics: 0,
  "women's clothing": 0,
};

init();

function connectDB() {
  const dbPath =
    process.cwd() + "/src/lib/api/data_adapter/db/sqlite/sqlite.db";
  return open({
    filename: dbPath,
    driver: sqlite.Database,
  });
}

async function init() {
  //Connect with db
  const db = await connectDB();
  //Adds tags into db
  for (let category in tagList) {
    const tagStatement = await db.prepare(insertProductTag());
    tagStatement.bind(category);
    const tagId = await tagStatement.get();
    tagList[category] = tagId.product_tag_id;
  }

  for (let i = 0; i < products.length; i++) {
    //insert Product
    const productStatement = await db.prepare(insertProduct());
    const product = products[i];
    console.log(product);
    //name,price,description,image,isArchived  //TODO: Add amount_sold as field
    productStatement.bind(
      product.title,
      product.price,
      product.description,
      product.image,
      true,
    );
    const prodId = await productStatement.get();

    if (products?.[i].category) {
      console.log(prodId, tagList[products[i].category]);
      const prodTagStatement = await db.prepare(insertProductTagLookUp());
      prodTagStatement.bind(prodId.product_id, tagList[products[i].category]);
      prodTagStatement.run();
    }
  }
}

function insertProduct() {
  return `INSERT INTO product (name,price,description,image,isArchived) VALUES (?,?,?,?,?) RETURNING product_id;`;
}
function insertProductTag() {
  return `INSERT INTO product_tag (product_tag_name) VALUES (?) RETURNING product_tag_id;`;
}

function insertProductTagLookUp() {
  return `INSERT INTO product_tag_lookup (product_id, tag_id) VALUES (?,?);`;
}
