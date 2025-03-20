import Order from "#models/order";
import Service from "#services/base";

class OrderService extends Service {
  static Model = Order;
}

export default OrderService;
