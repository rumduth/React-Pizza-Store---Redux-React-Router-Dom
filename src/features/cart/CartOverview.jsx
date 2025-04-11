import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const totalPizzas = cart.reduce((prev, cur) => cur.quantity + prev, 0);
  const totalPrices = cart.reduce((prev, cur) => cur.totalPrice + prev, 0);
  return (
    <div className="flex flex-col items-center justify-between bg-stone-600 p-4 text-sm text-stone-200 sm:flex-row sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 uppercase sm:space-x-6">
        {cart.length ? (
          <>
            <span className="font-bold text-amber-600">
              {`${totalPizzas} ${totalPizzas > 1 ? "pizzas" : "pizza"}`}{" "}
            </span>
            <span className="text-cyan-600 uppercase">
              Total is: ${totalPrices}
            </span>
          </>
        ) : (
          <span>Empty Cart</span>
        )}
      </p>
      <Link to="/cart" className="hover:text-amber-100">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
