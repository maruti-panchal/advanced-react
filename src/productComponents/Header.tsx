import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/auth-slice";
import Cart from "./Cart";

export default function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const role = useCartSelector((state) => state.auth.role);

  const isAuthenticated = useCartSelector(
    (state) => state.auth.isAuthenticated
  );

  const cartItemsCount = useCartSelector((state: any) =>
    state.cart.items.reduce(
      (total: number, item: { quantity: number }) =>
        total + item.quantity,
      0
    )
  );

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      {cartIsVisible && isAuthenticated && (
        <Cart onClose={handleCloseCartClick} />
      )}

      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>

        <p>
                  {!isAuthenticated ? (
            <>
              <button onClick={() => navigate("/login")}>
                Login
              </button>{" "}
              <button onClick={() => navigate("/signup")}>
                Signup
              </button>
            </>
          ) : (
            <>
              {/* 🔥 Admin Button (only for admin) */}
              {role === "ADMIN" && (
                <>
                 <button
                  className="admin-nav-btn"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
                </>
              )}

              <button onClick={handleOpenCartClick}>
                Cart ({cartItemsCount})
              </button>{" "}
              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </p>
      </header>
    </>
  );
}