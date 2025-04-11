import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../cart/cartSlice";
import ControlQuantityButton from "../../ui/ControlQuantityButton";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  let currentCart = useSelector((state) => state.cart.cart);
  const curPizza = currentCart.find((pizza) => pizza.pizzaId === id);
  const isInTheCart = Boolean(curPizza);
  function addItemToCart() {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  }
  function onIncrease() {
    dispatch(increaseItemQuantity(id));
  }
  function onDecrease() {
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <li className="mb-2 flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="text-xl font-medium tracking-widest hover:text-stone-500">
          {name}
        </p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {!soldOut && !isInTheCart && (
            <Button type="small" onClick={addItemToCart}>
              Add to Cart
            </Button>
          )}
          {!soldOut && isInTheCart && (
            <ControlQuantityButton
              onDecrease={onDecrease}
              onIncrease={onIncrease}
            >
              <span className="text-cyan-600 hover:text-cyan-800">
                {curPizza.quantity}
              </span>
            </ControlQuantityButton>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
