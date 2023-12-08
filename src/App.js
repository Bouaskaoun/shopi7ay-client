import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Meals />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
