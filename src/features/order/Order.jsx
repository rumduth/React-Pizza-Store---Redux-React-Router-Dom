// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
function Order() {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-5">
      <div className="mb-20 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <h2 className="inline-block rounded-2xl border border-amber-200 bg-amber-200 px-2 py-1 text-center text-xl font-bold text-slate-500 hover:bg-amber-400">
          Order #{id} status
        </h2>

        <div className="flex gap-4">
          {priority && (
            <span className="rounded-full bg-red-200 px-2 py-1 font-bold text-red-500 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-1 text-sky-100 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-400 px-4 py-5">
        <div className="flex justify-between">
          <p className="text-center tracking-widest">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : "Order should have arrived"}
          </p>
          <p className="text-center tracking-widest italic">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>
        <ul className="mt-4 divide-y divide-amber-500 border-t border-b">
          {cart.map((item) => (
            <OrderItem item={item} key={item.id} />
          ))}
        </ul>

        <div className="mt-5 flex flex-col items-center gap-4">
          <p className="space-x-4">
            <span className="italic">Price pizza: </span>{" "}
            <span className="text-slate-500">{formatCurrency(orderPrice)}</span>
          </p>

          {priority && (
            <p>
              <span className="italic">Price priority: </span>
              <span className="text-slate-500">
                {formatCurrency(priorityPrice)}
              </span>
            </p>
          )}
          <p className="space-x-4">
            <span className="font-bold">To pay on delivery: </span>{" "}
            <span className="rounded-2xl bg-red-400 px-2 py-1 font-bold">
              {formatCurrency(orderPrice + priorityPrice)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Order;

export async function loader({ params }) {
  let { id } = params;
  let data = await getOrder(id);
  return data;
}
