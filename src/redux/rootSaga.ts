import { all } from "redux-saga/effects";
import { watchFetchProducts } from "./productSaga";

export default function* rootSaga() {
  yield all([watchFetchProducts()]);
}
