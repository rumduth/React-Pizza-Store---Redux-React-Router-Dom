import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/store";
import { clearCart } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const totalPrices = cart.reduce((a, b) => a + b.totalPrice, 0);
  const username = user.username;
  const address = user.address;
  const position = user.position;
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmiting = navigation.state === "submitting";
  const priorityPrices = totalPrices * 0.15;
  const isLoadingAddress = user.status === "loading";
  const dispatch = useDispatch();
  function getLocation() {
    dispatch(fetchAddress());
  }
  return (
    <div className="px-2 py-4">
      <h2 className="mt-10 mb-10 text-center text-xl font-semibold tracking-widest text-slate-700 hover:text-[1.3rem] hover:text-slate-800">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex items-center gap-2 sm:block">
          <label className="label">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow sm:w-full"
            defaultValue={username.toUpperCase()}
          />
        </div>

        <div className="mb-5 flex items-center gap-2 sm:block">
          <label className="label">Phone number</label>
          <div className="grow">
            <div className="grow">
              <input
                type="tel"
                name="phone"
                required
                className="input w-full"
              />
            </div>
            {formErrors?.phone && (
              <p className="mt-2 grow rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 sm:block">
          <label className="label">Address</label>
          <div className="relative grow">
            {!address && (
              <button
                disabled={isLoadingAddress}
                onClick={getLocation}
                type="button"
                className="absolute top-2 right-2 rounded-xl border border-amber-300 bg-amber-400 px-4 text-cyan-600 hover:bg-amber-500"
              >
                Get Position
              </button>
            )}
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
            />
          </div>
          {user.status === "error" && (
            <p className="mt-2 grow rounded-md bg-red-100 p-2 text-xs text-red-700">
              {user.error}
            </p>
          )}
        </div>

        <div className="mt-5 mb-6 flex items-center gap-4">
          <input
            className="h-6 w-4 accent-amber-300 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <input
          type="hidden"
          value={
            position.latitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
          name="position"
        />
        <div className="text-center text-sm hover:text-lg">
          <Button type="primary" disabled={isSubmiting}>
            {isSubmiting
              ? "Placing order..."
              : withPriority
                ? `Order now, with total of ${formatCurrency(totalPrices + priorityPrices)}, including an additional ${formatCurrency(priorityPrices)} for priority order`
                : `Order now, with total of ${formatCurrency(totalPrices)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  let fd = await request.formData();
  let data = Object.fromEntries(fd.entries());
  let orderData = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority ? true : false,
  };
  const errors = {};
  if (!isValidPhone(orderData.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;
  store.dispatch(clearCart());
  let { id } = await createOrder(orderData);
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  orderHistory.push(id);
  localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

  return redirect(`/order/${id}`);
}
