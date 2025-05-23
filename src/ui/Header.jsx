import { Link } from "react-router-dom";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase shadow-md">
      <Link to="/" className="tracking-[0.2rem]">
        Fast React Pizza Co.
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/history" className="text-sm hover:text-white">
          Order History
        </Link>
        <Link to="/statistics" className="text-sm hover:text-white">
          Statistics
        </Link>
        <Username />
      </div>
    </header>
  );
}