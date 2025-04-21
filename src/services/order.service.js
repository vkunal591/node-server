import mongoose from "mongoose";
import Order from "#models/order";
import Service from "#services/base";

class OrderService extends Service {
  static Model = Order;

  static async get(id, filters = {}) {
    const {
      page = 1,
      limit = 10,
      ...restFilters
    } = filters;

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
        $unwind: { path: "$items.productData", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          userName: { $first: "$userData.name" },
          mobileNo: { $first: "$userData.mobileNo" },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          items: {
            $push: {
              quantity: "$items.quantity",
              product: "$items.productData",
            },
          },
          streetAddress: { $first: "$streetAddress" },
          city: { $first: "$city" },
          landMark: { $first: "$landMark" },
          state: { $first: "$state" },
          country: { $first: "$country" },
          pincode: { $first: "$pincode" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        }

      },

      // Pagination using facet
      {
        $facet: {
          result: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      },
      {
        $addFields: {
          totalItems: { $arrayElemAt: ["$totalCount.count", 0] },
        }
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

  static async getMyOrders(userId, filters = {}) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return await this.get(null, { ...filters, user: userId });
  }
}

export default OrderService;
