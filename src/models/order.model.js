import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";
import Product from "#models/product"

const productSchema = new BaseSchema({
  product: {
    type: BaseSchema.Types.ObjectId,
    required: true,
    ref: Product
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
})

const orderScherma = new BaseSchema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [productSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

orderScherma.pre("save", saveFile);

const OrderModel = mongoose.model("order", orderScherma);

export default OrderModel;
