import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      imgUrl: props.imgUrl,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <div className={classes.card}>
      <img src={props.imgUrl} alt={props.id} />
      <div className={classes.content}>
        <h2>{props.name}</h2>
        <div>
          <MealItemForm
            id={props.id}
            price={props.price}
            onAddToCart={addToCartHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default MealItem;
