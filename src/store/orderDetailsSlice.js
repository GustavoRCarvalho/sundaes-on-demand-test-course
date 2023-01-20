import { createSlice } from "@reduxjs/toolkit";
import { pricePerItem } from "../utils/constants";

const initialState = {
  scoops: {},
  toppings: {},
  totals: {
    scoops: 0,
    toppings: 0,
  },
};

function calculateTotal(state, type) {
  const countsArray = Object.values(state[type]);

  const totalCount = countsArray.reduce((total, value) => (total += value), 0);

  return pricePerItem[type] * totalCount;
}

function totals(state) {
  return {
    scoops: calculateTotal(state, "scoops"),
    toppings: calculateTotal(state, "toppings"),
  };
}

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    updateItemCount: (state, action) => {
      const { type, name, count } = action.payload;
      state[type][name] = count;
      state.totals = totals(state);
    },
    resetOrder: (state) => {
      state = initialState;
    },
  },
});

export const { updateItemCount, resetOrder, showTotals } =
  orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
