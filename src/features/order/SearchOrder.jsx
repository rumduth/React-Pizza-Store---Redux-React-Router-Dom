import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form
      action="POST"
      onSubmit={handleSubmit}
      className="px-2 py-1 text-sm bg-yellow-100 rounded-2xl"
    >
      <input
        className="tracking-wider transition-all duration-500 focus focus:ring-opacity-50 rounded-2xl placeholder:text-stone-400 focus:w-45 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
