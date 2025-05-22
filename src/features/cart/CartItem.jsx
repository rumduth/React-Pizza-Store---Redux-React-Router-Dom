import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between px-2 py-3 hover:bg-blue-100">
      <p className="flex gap-2">
        <span className="font-bold text-slate-400">{quantity} &times;</span>{" "}
        <span className="font-medium">{name}</span>
      </p>
      <div className="flex items-center gap-4">
        <p className="text-cyan-700 italic">{formatCurrency(totalPrice)}</p>
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
