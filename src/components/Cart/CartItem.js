import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <div className={classes["cart-item"]} key={props.id}>
      <div className={classes["cart-product"]}>
        <img src={props.image} alt={props.name} />
        <div>
          <h3>{props.name}</h3>
          <p>{props.desc}</p>
          <button onClick={props.onRemove}>Remove</button>
        </div>
      </div>
      <div className={classes["cart-product-price"]}>${props.price}</div>
      <div className={classes["cart-product-quantity"]}>
        <button onClick={props.onDecrease}>-</button>
        <div className={classes["count"]}>{props.amount}</div>
        <button onClick={props.onAdd}>+</button>
      </div>
      <div className={classes["cart-product-total-price"]}>
        ${props.price * props.amount}
      </div>
    </div>
  );
};

export default CartItem;
