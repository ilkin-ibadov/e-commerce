import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartProducts: []
    },
    reducers: {
      addToCart: (state, action) => {
        const isInCart = state.cartProducts.some(item => item.id === action.payload.id);
        // state.cartProducts.push(action.payload)
        if (isInCart) {
          // update existing item in cart
          return {
            ...state,
            cartProducts: state.cartProducts.map(
              item => item.id === action.payload.id
                ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
                : item
            ),
          };
        }
  
        // add new item to cart
        return {
          ...state,
          cartProducts: [
            ...state.cartProducts,
            {
              ...action.payload,
              quantity: 1
            },
          ],
        };
      },
      increaseQuantity: (state, action) => {
        return {
          ...state,
          cartProducts: state.cartProducts.map(
            item => item.id === action.payload.id
              ? {
                ...item,
                quantity: item.quantity + 1
              }
              :item
          ),
        };
      },
      decreaseQuantity: (state, action) => {
        return {
          ...state,
          cartProducts: state.cartProducts.map(
            item => item.id === action.payload.id
              ? {
                ...item,
                quantity: item.quantity - 1
              }
              :item
          ),
        };
      },
      removeItem: (state, action) => {
        return {
          ...state,
          cartProducts: state.cartProducts.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
    }
  })

  export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions

  export default cartSlice.reducer