import mongoose from "mongoose";
import Cart from "#models/cart";
import Service from "#services/base";

class CartService extends Service {
  static Model = Cart;

  static async get(id, filters = {}) {
    const { page = 1, limit = 10, ...restFilters } = filters;
    const skip = (page - 1) * limit;

    const matchStage = id
      ? [{ $match: { _id: new mongoose.Types.ObjectId(id) } }]
      : Object.keys(restFilters).length
      ? [{ $match: restFilters }]
      : [];

    const pipeline = [
      ...matchStage,
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.productData",
        },
      },
      {
        $unwind: {
          path: "$items.productData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          userName: { $first: "$userData.name" },
          items: {
            $push: {
              quantity: "$items.quantity",
              product: "$items.productData",
            },
          },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $facet: {
          result: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
      {
        $addFields: {
          totalItems: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ];

    const aggResult = await this.Model.aggregate(pipeline);
    const { result = [], totalItems = 0 } = aggResult[0] || {};

    return {
      result,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        itemsPerPage: parseInt(limit),
        currentPage: parseInt(page),
      },
    };
  }

  // 🔍 Get cart by userId directly
static async getCartByUserId(userId, page = 1, limit = 10) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;

  return this.get(null, {
    user: new mongoose.Types.ObjectId(userId),
    page: pageNum,
    limit: limitNum,
  });
}


  // ❌ Clear cart
  static async clearCart(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const result = await this.Model.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      throw new Error("No carts found for this user");
    }

    return {
      message: `Deleted ${result.deletedCount} cart(s) for user ${userId}`,
    };
  }
}

export default CartService;
