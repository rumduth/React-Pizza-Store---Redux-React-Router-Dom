import { useDispatch, useSelector } from "react-redux";
import { setDiningOption } from "./userSlice";

export default function Username() {
  const username = useSelector((state) => state.user.username);
  const serviceType = useSelector((state) => state.user.diningOption);
  const dispatch = useDispatch();
  if (!username) return null;

  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      <span className="hidden md:inline">{username}</span>
      <button
        onClick={() => dispatch(setDiningOption("dineIn"))}
        className={`h-8 w-20 rounded-full text-xs text-white transition ${
          serviceType === "dineIn"
            ? "bg-yellow-800"
            : "bg-yellow-500 hover:bg-yellow-800"
        }`}
      >
        Dine In
      </button>
      <button
        onClick={() => dispatch(setDiningOption("delivery"))}
        className={`h-8 w-20 rounded-full text-xs text-white transition ${
          serviceType === "delivery"
           ? "bg-yellow-800"
            : "bg-yellow-500 hover:bg-yellow-800"
        }`}
      >
        Delivery
      </button>
    </div>
  );
}
