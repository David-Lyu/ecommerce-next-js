import { Database, open } from "sqlite";
import sqlite from "sqlite3";
import { existsSync, writeFileSync } from "fs";
import { DataAdapter } from "../../models/adapter";
import { ProductListType, ProductType } from "../../models/products";

/*
  So thinking about real life situation, we would want to move this to its own backend.
  So it would run similarly to MySQL or PostgreSQL, and that if this app fails,
  The backend would still be up and wouldn't need to reopen the backend...only matters if sql size is large
  (Not tested if it would block or take a while, but stands to reason if this is GB's large it would take
  as fast as ram available to open, read and parse the file/buffer)
*/
export default class SQLiteDB implements DataAdapter {
  db: Database | undefined;
  isInitailized: boolean = false;
  constructor() {
    //Init database here
    //fs to see if file exists
    this.__initDB();
  }

  initialize(): void {
    // let i = 0;
    // while (!this.db) {
    //   i++;
    //   if (i % 1000000 == 0) {
    //     console.log(this.db);
    //     console.log("waiting for db" + i);
    //   }
    // }
    // console.log("db initialized");
    return;
  }

  getProduct(): ProductType {
    const objMock = {
      amount: 0.0,
      name: "test",
      description: "Test Description",
    };

    return objMock;
  }

  getProducts(): ProductListType {
    return [];
  }

  // For testing purposes: This class should never be extended so no worries on it being private
  protected __createDB() {
    writeFileSync("/src/lib/api/db/sqlite/sqlite.db", "");
  }

  // For testing purposes: This class should never be extended so no worries on it being private
  protected async __initDB() {
    //Check if db exists
    if (!existsSync(process.cwd() + "/src/lib/api/db/sqlite/sqlite.db")) {
      //open database
      this.__createDB();
    }

    this.db = await open({
      filename: process.cwd() + "/src/lib/api/db/sqlite/sqlite.db",
      driver: sqlite.Database,
    });

    this.db.exec("PRAGMA foreign_keys = ON");

    let statement = "";
    statement += this.__initProductTable() + "\n";
    statement += this.__initCustomerTable() + "\n";
    statement += this.__initAdminTable() + "\n";
    statement += this.__initOrderTable() + "\n";
    statement += this.__initVariantsTable() + "\n";
    statement += this.__initProductTagLookUpTable() + "\n";
    statement += this.__initPromoTable() + "\n";
    statement += this.__initStoreTable() + "\n";
    console.log("executing statement");
    console.log(this.db);
    this.db.exec(statement);
  }

  // protected for testing purposes: Creation of all possible tables
  protected __initProductTable(): string {
    return `CREATE TABLE IF NOT EXISTS product (
      prod_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT,
      isArchived BOOLEAN NOT NULL CHECK (isArchived in (0,1))
      )`;
  }
  protected __initCustomerTable(): string {
    return `CREATE table IF NOT EXISTS customer (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isArchived BOOLEAN NOT NULL CHECK (isArchived in (0,1)),
    session_id TEXT,
    auth_type TEXT
    )`;
  }
  protected __initAdminTable(): string {
    return `CREATE TABLE IF NOT EXISTS admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    session_id TEXT,
    auth_type TEXT,
    isArchived BOOLEAN NOT NULL CHECK (isArchived in (0,1)),
    )`;
  }
  protected __initOrderTable(): string {
    return `CREATE TABLE IF NOT EXISTS order (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date TEXT NOT NULL,
    shipped_date TEXT NOT NULL,
    status BOOLEAN NOT NULL CHECK (isArchived in (0,1)),
    total REAL NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id)
      REFERENCES customer (customer_id)
    )
    `;
  }

  protected __initOrderProductLookup(): string {
    return `CREATE TABLE IF NOT EXISTS order_product_lookup (
    op_lookup_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,

    )`;
  }

  protected __initVariantsTable(): string {
    return ``;
  }
  protected __initiTagTable(): string {
    return ``;
  }
  protected __initProductTagLookUpTable(): string {
    return ``;
  }
  protected __initPromoTable(): string {
    return ``;
  }
  protected __initStoreTable(): string {
    return ``;
  }
}
