import MySQLDatabase from "../../databases/MySQLDatabase.js";

const productRepo = MySQLDatabase.mysqlDataSource.getRepository("Product");
const CategoryRepo = MySQLDatabase.mysqlDataSource.getRepository("Category");

class ProductService {
  async findAllProducts(category) {
    return await productRepo.find({ where: { categoryId: category } });
  }
  async findProductById(id) {
    const product = await productRepo.findOne({ where: { id } });
    return product;
  }
  async createProduct(req) {
    console.log(process.env.CLOUDINARY_NAME);
    const { name, price, description, categoryId } = req.body;
    const imgPath = req.file?.path;
    console.log(imgPath);
    const newProduct = await productRepo.create({
      name,
      price,
      description,
      imgUrl: imgPath,
      categoryId,
    });
    return await productRepo.save(newProduct);
  }
  async findCategory() {
    return await CategoryRepo.find();
  }
  async findProductByCategoryId(categoryId) {
    return await productRepo.find({ where: { categoryId } });
  }
  async updateProduct(id, updatedData) {
    const productUpdate = await productRepo.findOne({ where: { id } });
    if (!productUpdate) {
      throw new Error("Product not found");
    }
    Object.assign(productUpdate, updatedData);
    return await productRepo.save(productUpdate);
  }
  async deleteProduct(id) {
    const productDelete = await productRepo.findOne({ where: { id } });
    if (!productDelete) {
      throw new Error("Product not found");
    }
    return await productRepo.remove(productDelete);
  }
}
export default new ProductService();
