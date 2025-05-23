// src/features/statistics/Statistics.jsx
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer 
} from 'recharts';


function Statistics() {
  const { orders, error } = useLoaderData();
  const [timeFrame, setTimeFrame] = useState('all'); // 'week', 'month', 'year', 'all'

  // Filter orders based on selected time frame
  const filteredOrders = orders.filter(order => {
    if (timeFrame === 'all') return true;
    
    const orderDate = new Date(order.createdAt || order.estimatedDelivery);
    const now = new Date();
    
    // Reset time to start of day for accurate comparisons
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const orderDay = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
    
    if (timeFrame === 'week') {
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return orderDay >= oneWeekAgo;
    }
    
    if (timeFrame === 'month') {
      const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      return orderDay >= oneMonthAgo;
    }
    
    if (timeFrame === 'year') {
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      return orderDay >= oneYearAgo;
    }
    
    return true;
  });

  // Calculate total money spent
  const totalSpent = filteredOrders.reduce((sum, order) => 
    sum + order.orderPrice + (order.priorityPrice || 0), 0);

  // Calculate favorite pizzas (by quantity ordered)
  const pizzaCountMap = {};
  filteredOrders.forEach(order => {
    order.cart.forEach(item => {
      if (!pizzaCountMap[item.name]) {
        pizzaCountMap[item.name] = 0;
      }
      pizzaCountMap[item.name] += item.quantity;
    });
  });

  const favoritePizzaData = Object.entries(pizzaCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Calculate spending by month
  const spendingByMonth = {};
  filteredOrders.forEach(order => {
    const date = new Date(order.createdAt || order.estimatedDelivery);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date found in order:', order);
      return;
    }
    
    const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    
    if (!spendingByMonth[monthYear]) {
      spendingByMonth[monthYear] = 0;
    }
    
    spendingByMonth[monthYear] += order.orderPrice + (order.priorityPrice || 0);
  });

  const spendingByMonthData = Object.entries(spendingByMonth)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/').map(Number);
      const [bMonth, bYear] = b.month.split('/').map(Number);
      
      if (aYear !== bYear) return aYear - bYear;
      return aMonth - bMonth;
    })
    .filter(item => item.month !== 'NaN/NaN'); // Filter out invalid dates

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6">Your Order Statistics</h2>
      
      {orders.length === 0 ? (
        <p className="text-stone-500">You don't have any order history to generate statistics.</p>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <button 
                onClick={() => setTimeFrame('week')}
                className={`px-4 py-2 rounded ${timeFrame === 'week' ? 'bg-yellow-500 text-white' : 'bg-stone-200'}`}
              >
                This Week
              </button>
              <button 
                onClick={() => setTimeFrame('month')}
                className={`px-4 py-2 rounded ${timeFrame === 'month' ? 'bg-yellow-500 text-white' : 'bg-stone-200'}`}
              >
                This Month
              </button>
              <button 
                onClick={() => setTimeFrame('year')}
                className={`px-4 py-2 rounded ${timeFrame === 'year' ? 'bg-yellow-500 text-white' : 'bg-stone-200'}`}
              >
                This Year
              </button>
              <button 
                onClick={() => setTimeFrame('all')}
                className={`px-4 py-2 rounded ${timeFrame === 'all' ? 'bg-yellow-500 text-white' : 'bg-stone-200'}`}
              >
                All Time
              </button>
            </div>
            
            <div className="bg-yellow-100 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Summary ({timeFrame === 'all' ? 'All Time' : timeFrame === 'week' ? 'This Week' : timeFrame === 'month' ? 'This Month' : 'This Year'})</h3>
              <p className="text-xl font-bold">Total Spent: {formatCurrency(totalSpent)}</p>
              <p>Orders: {filteredOrders.length}</p>
              {favoritePizzaData.length > 0 && (
                <p>Top Pizza: {favoritePizzaData[0].name} (ordered {favoritePizzaData[0].count} times)</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Favorite Pizzas Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Your Favorite Pizzas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={favoritePizzaData.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#FFBB28" name="Times Ordered" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pizza Distribution Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Pizza Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={favoritePizzaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {favoritePizzaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending Over Time */}
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold mb-4">Spending Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingByMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#FF8042" name="Amount Spent" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics;

// Loader function - export this and use it in your router configuration
export async function loader() {
  try {
    const { getOrder } = await import("../../services/apiRestaurant");
    const savedOrderIds = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    
    if (savedOrderIds.length === 0) {
      return { orders: [], error: null };
    }

    const fetchedOrders = await Promise.all(
      savedOrderIds.map(async (orderId) => {
        try {
          return await getOrder(orderId);
        } catch (err) {
          console.error(`Error fetching order ${orderId}:`, err);
          return null;
        }
      })
    );

    const validOrders = fetchedOrders.filter(order => order !== null);
    return { orders: validOrders, error: null };
  } catch (err) {
    console.error("Error loading orders:", err);
    return { orders: [], error: "Failed to load order statistics" };
  }
}
