import Cart from "#models/cart";
import Service from "#services/base";

class CartService extends Service {
  static Model = Cart;

  static async clearCart(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Delete all carts associated with the user
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
