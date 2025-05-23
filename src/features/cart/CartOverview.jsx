import { Link } from "react-router-dom";
function CartOverview() {
  return (
    <div className="flex flex-col items-center justify-between bg-stone-600 p-4 text-sm text-stone-200 sm:flex-row sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 uppercase sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart" className="hover:text-amber-100">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
