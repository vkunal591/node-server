import Order from "#models/order";
import Service from "#services/base";

class OrderService extends Service {
  static Model = Order;

  static async getMyOrders(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Delete all carts associated with the user
    const result = await this.Model.findAll({ user: userId });



    return {
      message: `Order ${result.deletedCount} of user ${userId}`,
    };
  }
}

export default OrderService;
