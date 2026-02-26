import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartState = {
  id: string | null;
  userId: string | null;
  items: CartItem[];
};

const initialState: CartState = {
  id: null,
  userId: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartState>) {
      console.log("Updating cart state:", state);
      return action.payload;
    },
    clearCartState() {
      return initialState;
    },
  },
});

export const { setCart, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;