import { configureStore } from "@reduxjs/toolkit";
import OrderDetailsSlice from "./orderDetailsSlice";

export default configureStore({
  reducer: { orderDetails: OrderDetailsSlice },
});
