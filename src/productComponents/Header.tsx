import { useState } from 'react';

import { useCartSelector } from '../redux/hooks.ts';
import Cart from './Cart.tsx';

export default function Header() {

  const [cartIsVisible, setCartIsVisible] = useState(false);
  const cartItemsCount = useCartSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartItemsCount})</button>
        </p>
      </header>
    </>
  );
}
