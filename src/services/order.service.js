import Order from "#models/order";
import Service from "#services/base";

class OrderService extends Service {
  static Model = Order;

  // static async getAllWithUsers() {
  //   try {
  //     return await this.Model.find()
  //       .populate("user", "name email mobileNo")
  //   } catch (error) {
  //     throw new Error(`Error fetching orders with users: ${error.message}`);
  //   }
  // }
}

export default OrderService;
