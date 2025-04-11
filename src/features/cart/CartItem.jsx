import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import ControlQuantityButton from "../../ui/ControlQuantityButton";
import { formatCurrency } from "../../utils/helpers";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "./cartSlice";

function CartItem({ item }) {
  const { name, quantity, totalPrice, pizzaId } = item;
  const dispatch = useDispatch();
  function onIncrease() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function onDecrease() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  function onDelete() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <li className="flex items-center justify-between px-2 py-3 hover:bg-blue-100">
      <p className="flex gap-2">
        <span className="font-bold text-slate-400">{quantity} &times;</span>{" "}
        <span className="font-medium">{name}</span>
      </p>
      <div className="flex items-center gap-4">
        <p className="text-cyan-700 italic">{formatCurrency(totalPrice)}</p>
        <ControlQuantityButton
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
        <Button type="small" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
