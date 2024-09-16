import express from "express";
import ProductsManager from "./src/data/products.manager.js";

const server = express();
const port = 8000;
const manager = new ProductsManager("./src/data/files/products.json");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Home");
});

server.get("/products", async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).send("ERROR GETTING PRODUCTS");
  }
});

server.get("/products/:pid", async (req, res) => {
  try {
    const products = await manager.getProductById(req.params.pid);
    res.json(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const ready = () => {
  console.log(`server ready on http://localhost:${port}`);
};
server.listen(port, ready);
