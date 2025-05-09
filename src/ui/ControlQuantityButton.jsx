import React from "react";

export default function ControlQuantityButton({
  children,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 hover:bg-amber-600"
        onClick={onDecrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {children}
      <button
        className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 hover:bg-amber-600"
        onClick={onIncrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
