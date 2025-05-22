import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);
  const cart = fakeCart;
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmiting = navigation.state === "submitting";

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
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mt-5 mb-6 flex items-center gap-4">
          <input
            className="h-6 w-4 accent-amber-300 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <div className="text-center text-sm hover:text-lg">
          <Button type="primary" disabled={isSubmiting}>
            {isSubmiting ? "Placing order..." : "Order now"}
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
    priority: data.priority === "on",
  };
  const errors = {};
  if (!isValidPhone(orderData.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  let { id } = await createOrder(orderData);

  return redirect(`/order/${id}`);
}
