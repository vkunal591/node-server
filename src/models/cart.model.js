import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const cartSchema = new BaseSchema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

cartSchema.pre("save", saveFile);

const CartModel = mongoose.model("cart", cartSchema);

export default CartModel;
