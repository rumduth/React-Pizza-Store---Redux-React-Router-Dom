import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex justify-between">
        <p>
          <span>{quantity}&times;</span>{" "}
          <span className="font-bold">{name}</span>
        </p>
        <p className="tracking-wider italic">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
