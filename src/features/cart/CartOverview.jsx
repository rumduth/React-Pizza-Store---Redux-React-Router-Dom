// src/features/cart/CartOverview.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const [isOpen, setIsOpen] = useState(false);
  const totalPizzas = cart.reduce((prev, cur) => cur.quantity + prev, 0);
  const totalPrices = cart.reduce((prev, cur) => cur.totalPrice + prev, 0);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  if (!cart.length){
    if(isOpen) setIsOpen(false);
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Cart Button */}
      <button 
        onClick={toggleCart}
        className="flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors"
      >
        ${totalPrices}
      </button>

      {/* Cart Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-64 bg-white rounded-lg shadow-xl p-4 border border-stone-200">
          <h3 className="font-bold text-lg mb-2">Your Cart</h3>
          <p className="mb-2">
            <span className="font-bold text-amber-600">
              {`${totalPizzas} ${totalPizzas > 1 ? "pizzas" : "pizza"}`}
            </span>
          </p>
          <ul className="mb-4 max-h-40 overflow-y-auto">
            {cart.map(item => (
              <li key={item.pizzaId} className="text-sm py-1 border-b border-stone-100">
                {item.name} x{item.quantity}
              </li>
            ))}
          </ul>
          <Link 
            to="/cart" 
            className="block w-full text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-900"
          >
            Open cart &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartOverview;