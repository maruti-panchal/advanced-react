import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { RootState, store } from "./redux/store";
import { useAppDispatch } from "./redux/hooks";
import { fetchProducts } from "./redux/product-slice";
import { loginSuccess } from "./redux/auth-slice";

import Header from "./productComponents/Header";
import Shop from "./productComponents/Shop";
import Product from "./productComponents/Product";

import Login from "./productComponents/Auth/Login";
import Signup from "./productComponents/Auth/Signup";
import OAuthSuccess from "./productComponents/Auth/OAuthSuccess";
import ProtectedRoute from "./productComponents/ProtectedRoute";
import PublicRoute from "./productComponents/PublicRoute";
import { fetchCartApi } from "./utils/cartApi";
import { setCart } from "./redux/cart-slice";
import AdminRoute from "./productComponents/AdminRoute";
import AdminDashboard from "./productComponents/AdminDashboard";

function Home() {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Shop>
      {isLoading && (
        <p style={{ textAlign: "center" }}>
          Loading...
        </p>
      )}

      {items.map((product) => (
        <li key={product.id}>
          <Product {...product} />
        </li>
      ))}
    </Shop>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      dispatch(
        loginSuccess({
          token,
          email: "restored-user",
          role,
        })
      );

      fetchCartApi().then((cart) => {
        dispatch(setCart(cart));
      });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
          <AdminDashboard />
          </AdminRoute>
        }
      />

    <Route path="/oauth-success" element={<OAuthSuccess />} />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
</Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;