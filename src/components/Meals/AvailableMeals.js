import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [isLoding, setIsLoding] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://shpi7ay-api.onrender.com/products"
        );
        setProducts(response.data);
        setIsLoding(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const mealsList = products.map((meal) => (
    <MealItem
      id={meal._id}
      key={meal._id}
      imgUrl={meal.imgUrl}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {isLoding && (
        <div className={classes["loader-container"]}>
          <div className={classes.loader}></div>
          <div className={classes["loader-text"]}>Loading...</div>
        </div>
      )}
      {!isLoding && <Card>{mealsList}</Card>}
    </section>
  );
};

export default AvailableMeals;
