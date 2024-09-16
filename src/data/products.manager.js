import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor(path) {
    this.path = path;
  }
  getId = () => {
    return crypto.randomBytes(12).toString("hex");
  };

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = { ...product, id: this.getId() };
    products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`ID ${id} NOT FOUND`);
    }
    return product;
  }

  async updateProduct(id, updateData) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`ID ${id} NOT FOUND`);
    }
    products[index] = { ...products[index], ...updateData };
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filterProducts = products.filter((p) => p.id === id);
    if (products.length === filterProducts.length) {
      throw new Error(`ID ${id} NOT FOUND`);
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(filterProducts, null, 2)
    );
    return `ID ${id} DELETED`;
  }
}

export default ProductsManager;
