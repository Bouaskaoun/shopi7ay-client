import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./Cart.module.css";
import CartItem from "./CartItem.js";
import CartContext from "../../store/cart-context.js";

const Cart = (props) => {
  const [codeIsValid, setCodeIsValid] = useState(true);
  const codeInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemDecreaseHandler = (id) => {
    cartCtx.decreaseItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleClearCart = () => {
    cartCtx.clearall();
  };

  const validateCode = (enteredCode) => {
    const isValid = enteredCode.trim().length > 0; // Add your validation logic here

    setCodeIsValid(isValid);
    return isValid;
  };

  const CheckoutHandler = async (event) => {
    event.preventDefault();

    const enteredCode = codeInputRef.current.value;

    if (validateCode(enteredCode)) {
      try {
        await axios.post(
          "https://shpi7ay-api.onrender.com/orders",
          {
            code: enteredCode,
            items: cartCtx.items,
            totalAmount: totalAmount,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error adding product:", error);
      }
      codeInputRef.current.value = "";
      handleClearCart();
    }
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      image={item.imgUrl}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onDecrease={cartItemDecreaseHandler.bind(null, item.id)}
    />
  ));

  return (
    <div className={classes["cart-container"]}>
      <h2>Shopping Cart</h2>
      {cartCtx.items.length === 0 ? (
        <div className={classes["cart-empty"]}>
          <p>Your cart is currently empty</p>
          <div className={classes["start-shopping"]}>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes["titles"]}>
            <h3 className={classes["product-title"]}>Product</h3>
            <h3 className={classes["price"]}>Price</h3>
            <h3 className={classes["quantity"]}>Quantity</h3>
            <h3 className={classes["total"]}>SubTotal</h3>
          </div>
          <div className={classes["cart-items"]}>{cartItems}</div>
          <div className={classes["cart-summary"]}>
            <button
              className={classes["clear-btn"]}
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className={classes["cart-checkout"]}>
              <div className={classes["subtotal"]}>
                <span>Total</span>
                <span className={classes["amount"]}>{totalAmount}</span>
              </div>
              <form onSubmit={CheckoutHandler}>
                <input
                  name="code"
                  type="text"
                  placeholder="Code Appoge"
                  ref={codeInputRef}
                  className={!codeIsValid ? classes["invalid"] : ""}
                />
                {!codeIsValid && (
                  <p className={classes["error-message"]}>
                    Please enter a valid code.
                  </p>
                )}
                <button>Order</button>
              </form>
              <div className={classes["continue-shopping"]}>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
