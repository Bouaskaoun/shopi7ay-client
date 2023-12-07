import { Link } from "react-router-dom";
import mainheaderImage from "../../assets/headerBanner_.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <h1>Grocery App</h1>
        </Link>
        <Link to="/cart">
          <HeaderCartButton onClick={props.onShowCart} />
        </Link>
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
