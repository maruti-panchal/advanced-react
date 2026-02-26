import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchProducts,
  fetchProductsFailed,
  fetProductsSuccess,
  Product
} from "./product-slice";

function fetchProductsAPI() {
  return fetch("http://localhost:8080/products")
    .then(res => res.json());
}

export function* fetchProductsSaga(): any {
  try {
    const data: Product[] = yield call(fetchProductsAPI);
    yield put(fetProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailed("Failed to fetch products"));
  }
}

export function* watchFetchProducts() {
  yield takeEvery(fetchProducts.type, fetchProductsSaga);
}
