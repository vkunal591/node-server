import Cart from "#models/cart";
import Service from "#services/base";

class CartService extends Service {
  static Model = Cart;
}

export default CartService;
