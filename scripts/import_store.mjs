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

function connectDB() {
  const dbPath =
    process.cwd() + "/src/lib/api/data_adapter/db/sqlite/sqlite.db";
  return open({
    filename: dbPath,
    driver: sqlite.Database,
  });
}

function init() {
  //Connect with db
  const db = connectDB();
  //Should make it a map and then do logic all at once but going to seperate the logic in for loop
  const categorySet = new Set();
  console.log(products[0]);
  db.then((db) => {
    console.log(db);
    //Adds products into db
    for (let i = 0; i < products.length; i++) {
      if (products?.[i].category) {
        categorySet.add(products[i].category);
      }
      //sends products into db
    }
    //Adds categories(tags) into db
    //send categorySet into db
    const regex = /[" "/'/"]/;
    categorySet.forEach((category) => {
      console.log(category);
      const parsed = category.replaceAll(" ", "_");
      console.log(parsed);
    });
  }).catch((e) => {
    console.log(e);
  });
}
init();
