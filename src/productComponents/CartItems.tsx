import { useAppDispatch, useCartSelector } from "../redux/hooks";
import { setCart } from "../redux/cart-slice";
import {
  addToCartApi,
  removeFromCartApi,
  clearCartApi,
} from "../utils/cartApi";

export default function CartItems() {
  const dispatch = useAppDispatch();
  const cart = useCartSelector((state) => state.cart);

  async function handleIncrease(productId: string) {
    const updatedCart = await addToCartApi(productId, 1);
    dispatch(setCart(updatedCart));
  }

  async function handleDecrease(
    productId: string,
    quantity: number
  ) {
    if (quantity === 1) {
      const updatedCart = await removeFromCartApi(productId);
      dispatch(setCart(updatedCart));
    } else {
      const updatedCart = await addToCartApi(productId, -1);
      dispatch(setCart(updatedCart));
    }
  }

  async function handleClearCart() {
    const updatedCart = await clearCartApi();
    dispatch(setCart(updatedCart));
  }

  return (
    <div id="cart">
      {cart.items.length === 0 ? (
        <p>No items in cart!</p>
      ) : (
        <>
          <ul id="cart-items">
            {cart.items.map((item) => (
              <li key={item.productId}>
                <div>
                  <span>{item.productId}</span>
                </div>

                <div className="cart-item-actions">
                  <button
                    onClick={() =>
                      handleDecrease(item.productId, item.quantity)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleIncrease(item.productId)
                    }
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button onClick={handleClearCart} id="cart-actions">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}