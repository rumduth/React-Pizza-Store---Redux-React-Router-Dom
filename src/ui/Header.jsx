// src/ui/Header.jsx
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase shadow-md">
      <Link to="/" className="tracking-[0.2rem]">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}