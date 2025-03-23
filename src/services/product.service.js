import Product from "#models/product";
import Service from "#services/base";

class ProductService extends Service {
  static Model = Product;

}

export default ProductService;
