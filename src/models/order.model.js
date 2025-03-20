import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const orderScherma = new BaseSchema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

orderScherma.pre("save", saveFile);

const OrderModel = mongoose.model("order", orderScherma);

export default OrderModel;
