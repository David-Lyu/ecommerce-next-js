import sqlite, { open } from "sqlite";
import { existsSync, writeFileSync } from "fs";
import { BackendAdapter } from "../../adapter/models/adapter";
import { ProductListType, ProductType } from "../../adapter/models/products";

export default class SQLiteDB implements BackendAdapter {
  db: sqlite.Database | undefined;
  isInitailized: boolean = false;
  constructor() {
    //Init database here
    //fs to see if file exists
    this.__initDB();
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
    writeFileSync("./sqlite.db", "");
  }

  // For testing purposes: This class should never be extended so no worries on it being private
  protected async __initDB() {
    //Check if db exists
    if (!existsSync("./sqlite.db")) {
      //open database
      this.__createDB();
    }

    this.db = await open({
      filename: "./sqlite.db",
      driver: sqlite.Database,
    });
    let statement = "";
    statement += this.__initProductTable();
    statement += this.__initUserTable();
    statement += this.__initAdminTable();
    statement += this.__initOrderTable();
    statement += this.__initVariantsTable();
    statement += this.__initProductTagTable();
    statement += this.__initPromoTable();
    statement += this.__initStoreTable();

    this.db.exec(statement);
  }

  // protected for testing purposes: Creation of all possible tables
  protected __initProductTable(): string {
    return `CREATE TABLE IF NOT EXIST product (
      prod_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      description TEXT,
      image TEXT,
      isArchived BOOLEAN NOT NULL CHECK (isArchieved in (0,1))
      )`;
  }
  protected __initUserTable(): string {
    return `CREATE table IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isArchived BOOLEAN NOT NULL CHECK (isArchieved in (0,1)),
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
    isArchived BOOLEAN NOT NULL CHECK (isArchieved in (0,1)),
    )`;
  }
  protected __initOrderTable(): string {
    return ``;
  }
  protected __initVariantsTable(): string {
    return ``;
  }
  protected __initProductTagTable(): string {
    return ``;
  }
  protected __initPromoTable(): string {
    return ``;
  }
  protected __initStoreTable(): string {
    return ``;
  }
}
