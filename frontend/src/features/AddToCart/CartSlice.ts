import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/type";
import { RootState } from "../../store/store";

interface CartItem extends Product {
 quantity : number
}

interface CartState {
    items : CartItem[];
}

const initialState : CartState={
    items :[],
}

export const CartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers:{

     addItem :(state,action:PayloadAction<Product>)=>{
        const newItem = action.payload;
    
        const existingItem = state.items.find((item)=> item.id === newItem.id);
    
        existingItem ? existingItem.quantity += 1 : state.items.push({...newItem , quantity:1})
     },

      removeItem :(state,action:PayloadAction<number>)=>{
        state.items = state.items.filter((item)=> item.id !== action.payload);
      },

      updateQuantity:(state, action :PayloadAction<{id:number;quantity:number}>)=>{
        const {id , quantity} = action.payload;
         if(quantity<=0) return ;
        const existingItem = state.items.find((item)=> item.id === id);
        existingItem? existingItem.quantity = quantity : null
      },
      
      clearCart:(state)=>{
        state.items = []
      }

    }
});

export const {addItem,removeItem,updateQuantity,clearCart} = CartSlice.actions;

//Selectors

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state:RootState) => state.cart.items.reduce((total,item)=> total + item.price * item.quantity,0)
export  const selectTotalQuantity = (state:RootState) => state.cart.items.reduce((total ,item)=> total + item.quantity,0)

export default CartSlice.reducer
