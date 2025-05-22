import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatDate, formatCurrency } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
function OrderHistory() {
  const orders = useLoaderData();

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-stone-500">You don't have any order history yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-stone-500">
                    Placed on {formatDate(order.estimatedDelivery)}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'preparing' ? 'bg-amber-100 text-amber-800' : 
                  'bg-stone-100 text-stone-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm font-medium">Items:</p>
                  <ul className="text-sm">
                    {order.cart.map((item) => (
                      <li key={item.pizzaId}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium">Total:</p>
                  <p className="font-bold">{formatCurrency(order.orderPrice + (order.priorityPrice || 0))}</p>
                  {order.priority && (
                    <p className="text-xs text-stone-500">Includes priority fee</p>
                  )}
                </div>
              </div>

              <div className="mt-3 text-right">
                <Link 
                  to={`/order/${order.id}`} 
                  className="text-sm text-amber-600 hover:text-amber-800"
                >
                  View details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;

export async function loader() {
  try {
    const savedOrderIds = JSON.parse(localStorage.getItem("orderHistory") || "[]");

    if (savedOrderIds.length === 0) return [];

    const orders = await Promise.all(
      savedOrderIds.map(async (orderId) => {
        try {
          return await getOrder(orderId);
        } catch (err) {
          console.error(`Error fetching order ${orderId}:`, err);
          return null;
        }
      })
    );

    return orders.filter(order => order !== null);
  } catch (err) {
    console.error("Loader error:", err);
    throw new Response("Failed to load order history", { status: 500 });
  }
}