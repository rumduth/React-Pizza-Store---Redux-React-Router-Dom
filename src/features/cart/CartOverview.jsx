// src/features/cart/CartOverview.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrder } from "../../services/apiRestaurant";

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const totalPizzas = cart.reduce((prev, cur) => cur.quantity + prev, 0);
  const totalPrices = cart.reduce((prev, cur) => cur.totalPrice + prev, 0);

  // Load active order ID from localStorage
  useEffect(() => {
    const checkActiveOrder = async () => {
      const activeOrderId = localStorage.getItem('activeOrderId');
      if (activeOrderId) {
        try {
          const order = await getOrder(activeOrderId);
          setActiveOrder(order);
        } catch (error) {
          console.error('Error fetching active order:', error);
          localStorage.removeItem('activeOrderId');
        }
      }
    };
    
    checkActiveOrder();
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  if (!cart.length && !activeOrder) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Cart Button */}
      <button 
        onClick={toggleCart}
        className="flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors relative"
      >
        ${totalPrices}
        {(cart.length > 0 || activeOrder) && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length || (activeOrder ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Cart Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl p-4 border border-stone-200">
          <h3 className="font-bold text-lg mb-2">Your Cart</h3>
          
          {/* Active Order Section */}
          {activeOrder && (
            <div className="mb-4 p-3 bg-amber-50 rounded-md">
              <h4 className="font-semibold text-sm mb-1">Active Order #{activeOrder.id}</h4>
              <p className="text-sm mb-1">
                Status: <span className={`font-medium ${activeOrder.status === 'preparing' ? 'text-amber-600' : 'text-green-600'}`}>
                  {activeOrder.status}
                </span>
              </p>
              <p className="text-sm">
                Estimated delivery: {new Date(activeOrder.estimatedDelivery).toLocaleTimeString()}
              </p>
              <Link 
                to={`/order/${activeOrder.id}`} 
                className="text-xs text-amber-600 hover:text-amber-800 block mt-1"
              >
                View order details &rarr;
              </Link>
            </div>
          )}
          
          {/* Cart Items Section */}
          {cart.length > 0 ? (
            <>
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
            </>
          ) : (
            !activeOrder && <p className="text-sm text-stone-500">Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CartOverview;