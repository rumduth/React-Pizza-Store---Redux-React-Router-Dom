import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  function onReset() {
    dispatch(clearCart());
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {cart.length ? (
        <>
          <h2 className="mt-7 mb-4 text-xl font-semibold">
            Your cart, {username}
          </h2>
          <ul className="divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>
          <div className="mt-5 flex justify-between">
            <Button to="/order/new" disabled={cart.length === 0}>
              Order pizzas
            </Button>
            <Button type="reset" onClick={onReset}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-30 text-center text-2xl font-bold tracking-widest text-amber-500">
          Your cart is empty! Please{" "}
          <Link to="/menu" className="font-bold text-cyan-500">
            order here
          </Link>{" "}
        </p>
      )}
    </div>
  );
}

export default Cart;
