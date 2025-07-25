import CartService from "#services/cart";
import httpStatus from "#utils/httpStatus";
import asyncHandler from "#utils/asyncHandler";
import { sendResponse } from "#utils/response";

export const get = asyncHandler(async function (req, res, _next) {
  const { id } = req.params;
  const filter = req.query;
  const data = await CartService.get(id, filter);
  sendResponse(httpStatus.OK, res, data, "Record fetched successfully");
});

export const create = asyncHandler(async function (req, res, _next) {
  const createdDoc = await CartService.create(req.body);
  sendResponse(
    httpStatus.CREATED,
    res,
    createdDoc,
    "Record created successfully"
  );
});

export const update = asyncHandler(async function (req, res, _next) {
  const { id } = req.params;
  const updatedDoc = await CartService.update(id, req.body);
  sendResponse(httpStatus.OK, res, updatedDoc, "Record updated successfully");
});

export const deleteData = asyncHandler(async function (req, res, _next) {
  const { id } = req.params;
  const deletedDoc = await CartService.deleteDoc(id);
  sendResponse(httpStatus.OK, res, deletedDoc, "Record deleted successfully");
});

export const clearData = asyncHandler(async function (req, res, _next) {
  const { id } = req.params;
  console.log(id);
  const deletedDoc = await CartService.clearCart(id);
  sendResponse(httpStatus.OK, res, deletedDoc, "Clear cart successfully");
});

export const getByUserId = asyncHandler(async function (req, res, _next) {
  const { userId } = req.params;
  const { page, limit } = req.query;
  console.log(userId);
  const deletedDoc = await CartService.getCartByUserId(userId, page, limit);
  sendResponse(httpStatus.OK, res, deletedDoc, "Get cart successfully");
});
