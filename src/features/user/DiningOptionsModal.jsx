// src/features/user/DiningOptionsModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { updateName, setDiningOption, createSession } from "./userSlice";
import { useNavigate } from "react-router-dom";

function DiningOptionsModal() {
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !selectedOption) return;
    
    dispatch(updateName(username));
    dispatch(setDiningOption(selectedOption));
    dispatch(createSession());
    
    navigate("/menu");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Welcome to our Pizza Shop</h2>
        
        <form onSubmit={handleSubmit}>
          <p className="mb-4">Please tell us your name and how you'd like to dine:</p>
          
          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 h-10 w-full rounded-3xl bg-amber-50 py-2 px-6 text-sm hover:bg-amber-200"
            required
          />
          
          <div className="mb-4 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="diningOption"
                value="dineIn"
                checked={selectedOption === "dineIn"}
                onChange={() => setSelectedOption("dineIn")}
                className="h-4 w-4"
              />
              <span>Dine In</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="diningOption"
                value="delivery"
                checked={selectedOption === "delivery"}
                onChange={() => setSelectedOption("delivery")}
                className="h-4 w-4"
              />
              <span>Delivery</span>
            </label>
          </div>
          
          <div className="flex justify-center">
            <Button type="primary" disabled={!username || !selectedOption}>
              Continue to Menu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DiningOptionsModal;