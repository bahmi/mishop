import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // handle if an item already exists in the cart
    case CART_ADD_ITEM:
      const item = action.payload;

      // check if a specific item exists
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          // if the item exists, then return it
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // if item doesn't exist, push it to the cart array
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
