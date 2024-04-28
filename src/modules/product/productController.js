import productService from "./productService.js";

class ProductController {
  async getAllProduct(req, res) {
    const { category } = req.query;
    const products = await productService.findAllProducts(category);
    return res.status(200).json({
      products,
    });
  }
  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const product = await productService.findProductById(Number(id));
      if (!product) {
        throw new Error("Not Found");
      }
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async postCreateProduct(req, res) {
    const newProduct = await productService.createProduct(req);
    return res.status(200).json(newProduct);
  }
  async getCategory(req, res) {
    const category = await productService.findCategory();

    return res.status(200).json(category);
  }
  async getProductCategoryId(req, res) {
    const categoryId = req.params.categoryId;
    const product = await productService.findProductByCategoryId(
      Number(categoryId)
    );
    if (!product) {
      throw new Error("Not Found");
    }

    return res.status(200).json(product);
  }
  async putUpdateProduct(req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    const updateProducts = await productService.updateProduct(
      Number(id),
      updatedData
    );
    return res.status(200).json("update Success");
  }
  async GetDeleteProduct(req, res) {
    const { id } = req.params;
    const deleteProduct = await productService.deleteProduct(Number(id));
    return res.status(200).json("Delete Success");
  }
}
export default new ProductController();
