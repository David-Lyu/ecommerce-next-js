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
  dbPath: string = "/src/lib/api/data_adapter/db/sqlite/sqlite.db";
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
    writeFileSync(process.cwd() + this.dbPath, "");
  }

  // For testing purposes: This class should never be extended so no worries on it being private
  protected async __initDB() {
    //Check if db exists
    if (!existsSync(process.cwd() + this.dbPath)) {
      //open database
      this.__createDB();
    }

    this.db = await open({
      filename: process.cwd() + this.dbPath,
      driver: sqlite.Database,
    });
    // Allows for foreign_keys, since disabled by default
    await this.db.exec("PRAGMA foreign_keys = ON");

    console.log("executing statement");
    await this.db.exec(this.__initProductTable());
    await this.db.exec(this.__initCustomerTable());
    await this.db.exec(this.__initAdminTable());
    await this.db.exec(this.__initOrderTable());
    await this.db.exec(this.__initOrderProductLookUpTable());
    await this.db.exec(this.__initVariantsTable());
    await this.db.exec(this.__initProductTagLookUpTable());
    await this.db.exec(this.__initPromoTable());
    await this.db.exec(this.__initPromoTagLookUpTable());
    await this.db.exec(this.__initStoreTable());
    //statement += this.__initStoreAdminLookUpTable() + "\n";
    console.log("sql creation completed");
  }

  // protected for testing purposes: Creation of all possible tables
  protected __initProductTable(): string {
    return `CREATE TABLE IF NOT EXISTS product (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    isArchived BOOLEAN NOT NULL CHECK (isArchived in (0,1))
    )`;
  }
  protected __initOrderTable(): string {
    return `CREATE TABLE IF NOT EXISTS order_info (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date TEXT NOT NULL,
    shipped_date TEXT NOT NULL,
    status BOOLEAN NOT NULL CHECK (status in (0,1)),
    total REAL NOT NULL,
    customer_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id)
      REFERENCES customer (customer_id)
    )`;
  }

  protected __initOrderProductLookUpTable(): string {
    return `CREATE TABLE IF NOT EXISTS order_product_lookup (
    op_lookup_id INTEGER PRIMARY KEY AUTOINCREMENT,
    quantity INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (order_id)
      REFERENCES order_info (order_id),
    FOREIGN KEY (product_id)
      REFERENCES product (product_id)
    )`;
  }

  protected __initVariantsTable(): string {
    return `CREATE TABLE IF NOT EXISTS variant (
    variant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    main_product_id INTEGER NOT NULL,
    variant_product_id INTEGER NOT NULL,
    FOREIGN KEY (main_product_id)
      REFERENCES product (product_id),
    FOREIGN KEY (variant_product_id)
      REFERENCES product (product_id)
    )`;
  }
  protected __initProductTagTable(): string {
    return `CREATE TABLE IF NOT EXISTS product_tag (
    product_tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_tag_name TEXT NOT NULL
    )`;
  }
  protected __initProductTagLookUpTable(): string {
    return `CREATE TABLE IF NOT EXISTS product_tag_lookup_table (
    pt_lookup_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (product_id)
      REFERENCES product (product_id),
    FOREIGN KEY (tag_id)
      REFERENCES tag (tag_id)
    )`;
  }
  protected __initPromoTable(): string {
    return `CREATE TABLE IF NOT EXISTS promo (
    promo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_name TEXT NOT NULL,
    sale_amount INTEGER NOT NULL,
    isPercent BOOLEAN NOT NULL CHECK (isPercent in (0,1)),
    sale_start_date TEXT NOT NULL,
    sale_end_date TEXT NOT NULL
    )`;
  }

  protected __initPromoTagLookUpTable(): string {
    return `CREATE TABLE IF NOT EXISTS promo_tag_lookup_table (
    promot_id INTEGER PRIMARY KEY AUTOINCREMENT,
    promo_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (promo_id)
      REFERENCES promo (promo_id),
    FOREIGN KEY (tag_id)
      REFERENCES tag (tag_id)
    )`;
  }
  protected __initStoreTable(): string {
    return `CREATE TABLE IF NOT EXISTS store (
    store_id INTEGER PRIMARY KEY AUTOINCREMENT,
    store_name TEXT NOT NULL,
    main_admin_user INTEGER NOT NULL
    )`;
  }
}
