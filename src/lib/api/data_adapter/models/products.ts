// Types are from fakestore api and inserted into local db: See /scripts/import_stroe.mjs
/*
  Product example from /fakestore.json:
  "id": 18,
  "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
  "price": 9.85,
  "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
  "category": "women's clothing",
  "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  "rating": { "rate": 4.7, "count": 130 }
*/
export type ProductType = {
  id: number;
  price: number;
  title: string;
  category?: string;
  image: string;
  description: string;
};

export type ProductListType = ProductType[];
