import Order from "#models/order";
import Service from "#services/base";

class OrderService extends Service {
  static Model = Order;

  static async get(id, filters) {
    const initialStage = [{
      $lookup: {
        from: "users",
        as: "userData",
        localField: "userId",
        foreignField: "_id"
      }
    }];
    const extraStage = [{
      $project: {
        totalAmount: 1,
        status: 1,
        userName: { $arrayElemAt: ["$userData.name", 0] }
      }
    }];

    if (!id) {
      return await this.Model.findAll(filters, initialStage, extraStage);
    }
    return await this.Model.aggregate([{
      $match: {
        _id: new mongoose.Types.ObjectId(id)
      },
      ...initialStage, ...extraStage
    }])

  }

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
