import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, ingredients = [] }) {
  const { quantity, name, totalPrice } = item;
  const ingredientsSummary = ingredients
    .map((ing) => ing[0].toUpperCase() + ing.slice(1))
    .join(", ");
  return (
    <li>
      <div className="flex justify-between">
        <p>
          <span>{quantity}&times;</span>{" "}
          <span className="font-bold">{name} </span>
          {ingredientsSummary ? (
            <span className="text-sm font-light text-slate-500 italic hover:text-slate-700">
              - {ingredientsSummary}
            </span>
          ) : (
            <span className="text-sm font-light text-slate-500 italic hover:text-slate-700">
              Loading...
            </span>
          )}
        </p>

        <p className="tracking-wider italic">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
