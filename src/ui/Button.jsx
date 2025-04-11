import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, ...props }) {
  let className =
    "inline-block font-semibold tracking-wider transition-all duration-30 focus:outline-one rounded-3xl bg-amber-200 hover:bg-amber-400 hover:text-stone-800 focus:bg-yellow-300 focus:ring focus:ring-amber-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  if (type === "small") {
    className += " text-xs bg-amber-500 py-2 px-2 text-amber-100";
  } else if (type === "reset") {
    className +=
      " italic text-gray-500 hover:text-gray-600 bg-white hover:bg-gray-400 hover:text-gray-600 border-stone-200 border-3 py-2 px-2";
  } else {
    className += " text-slate-600 px-4 py-3";
  }
  if (to && !disabled)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={className} {...props}>
      {children}
    </button>
  );
}
