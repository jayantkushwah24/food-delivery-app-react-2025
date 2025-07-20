import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <div className="cart-container">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const { name, defaultPrice, imageId, id } = item;
            return (
              <div key={id} className="cart-item">
                <img
                  src={`https://media-assets.swiggy.com/${imageId}`}
                  alt={name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h3>{name}</h3>
                  <p>₹{defaultPrice / 100}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-cart">No items in the cart</div>
        )}
        {cartItems.length > 0 && (
          <button id="clear-cart" onClick={handleClearCart}>
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
