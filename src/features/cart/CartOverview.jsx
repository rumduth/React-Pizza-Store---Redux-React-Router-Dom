// src/features/cart/CartOverview.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";
import { useDispatch } from "react-redux";
function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const [isOpen, setIsOpen] = useState(false);
  const totalPizzas = cart.reduce((prev, cur) => cur.quantity + prev, 0);
  const totalPrices = cart.reduce((prev, cur) => cur.totalPrice + prev, 0);
  const dispatch = useDispatch();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  if (!cart.length) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-colors hover:bg-amber-600"
      >
        ${totalPrices}
        {(cart.length > 0) && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cart.length }
          </span>
        )}
      </button>

      {/* Cart Popup */}
      {isOpen && (
        <div className="absolute right-0 bottom-20 w-80 rounded-lg border border-stone-200 bg-white p-4 shadow-xl">
          <h3 className="mb-2 text-lg font-bold">Your Cart</h3>

          {/* Cart Items Section */}
          {cart.length > 0 && (
            <>
              <p className="mb-2">
                <span className="font-bold text-amber-600">
                  {`${totalPizzas} ${totalPizzas > 1 ? "pizzas" : "pizza"}`}
                </span>
              </p>
              <ul className="mb-4 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.pizzaId}
                    className="flex items-center justify-between border-b border-stone-100 py-1 text-sm"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          dispatch(increaseItemQuantity(item.pizzaId))
                        }
                        className="h-8 w-8 rounded-full bg-yellow-500 text-lg font-bold text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          dispatch(decreaseItemQuantity(item.pizzaId))
                        }
                        className="h-8 w-8 rounded-full bg-yellow-500 text-lg font-bold text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      >
                        −
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/cart"
                className="block w-full rounded bg-stone-800 py-2 text-center text-white hover:bg-stone-900"
              >
                Open cart &rarr;
              </Link>
            </>
          ) }
        </div>
      )}
    </div>
  );
}

export default CartOverview;
