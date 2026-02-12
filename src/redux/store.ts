import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { productSlice } from "./product-slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        cart:cartSlice.reducer,
        product:productSlice.reducer
    }, middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);
export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;