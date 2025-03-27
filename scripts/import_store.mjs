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
const tagList = [
  "men-s_clothing",
  "jewelery",
  "electronics",
  "women-s_clothing",
];

init();

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

  db.then((db) => {
    console.log(db);
    //Adds products into db
    for (let i = 0; i < tagList.length; i++) {
      //insert categories
    }
    for (let i = 0; i < products.length; i++) {
      if (products?.[i].category) {
        categorySet.add(products[i].category);
      }
      //sends products into db
    }
    // Used to get the list of categorys in products json.
    // const categorySet = new Set();
    // categorySet.forEach((category) => {
    //   let parsed = category.replaceAll(/'/g, "-");
    //   parsed = parsed.replaceAll(/[ ""]/g, "_");
    //   console.log(parsed);
    // });
  }).catch((e) => {
    console.log(e);
  });
}

function insertProducts() {
  return `INSERT INTO products() VALUES(? ? ?)`;
}
function insertTags() {
  return `INSERT INTO tags() VALUES()`;
}
