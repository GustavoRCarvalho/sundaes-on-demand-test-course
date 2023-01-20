import { configureStore } from "@reduxjs/toolkit";
import OrderDetailsSlice from "./OrderDetailsSlice";

export default configureStore({
  reducer: { orderDetails: OrderDetailsSlice },
});
