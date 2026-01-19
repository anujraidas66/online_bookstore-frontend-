import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocal, setCartToLocal } from "../local/local";

export const cartSlice = createSlice({
    name:'cartSlice',
    initialState:{
        carts:getCartFromLocal()
    },

    reducers:{
        setCart: (state, action) =>{
            const isExist = state.carts.find(item => item.id === action.payload.id);
            if(isExist){
                state.carts = state.carts.map((cart)=>{
                    return cart.id == action.payload.id ? action.payload : cart;
                })
                setCartToLocal(state.carts);
            }else{
             state.carts = [...state.carts,action.payload];
             setCartToLocal(state.carts);
            }
            
        },

        removeCart: (state,action) =>{
            state.carts = state.carts.filter((item) => item.id !== action.payload.id);
            setCartToLocal(state.carts); 
        },

        clearCart: (state) => {
            state.carts = []
            setCartToLocal(state.carts);
        }
    }
});

export const {setCart,removeCart,clearCart} = cartSlice.actions;