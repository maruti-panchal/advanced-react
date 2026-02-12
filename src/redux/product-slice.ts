import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Product = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type ProductState = {
    isLoading: boolean;
    error: string | null;
    items:Product[];
}

const initialState:ProductState={
    isLoading:false,
    error:null,
    items:[]
}

export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
       fetchProducts:(state)=>{
        state.isLoading=true; 
        state.error=null;
     },
        fetchProductsFailed:(state,action:PayloadAction<string>)=>{
        state.error=action.payload;
        state.isLoading=false;
     },
        fetProductsSuccess:(state,action:PayloadAction<Product[]>)=>{
        state.items=action.payload;
        state.isLoading=false;
        state.error=null;
     }
    }

});

export const {fetchProducts,fetchProductsFailed,fetProductsSuccess}=productSlice.actions;
export default productSlice.reducer;
