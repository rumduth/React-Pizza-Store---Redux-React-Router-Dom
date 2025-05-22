// src/ui/Home.jsx
import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import DiningOptionsModal from "../features/user/DiningOptionsModal";
import Menu from "../features/menu/Menu";
import Button from "./Button";

function Home() {
  const { username, hasValidSession } = useSelector((state) => state.user);
  
  // Show the modal if there's no valid session
  if (!hasValidSession) {
    return <DiningOptionsModal />;
  }

  return (
    <div className="my-10 px-4 sm:my-16">
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="tracking-widest text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? (
        <div className="flex items-center justify-center uppercase">
          <Button to="/menu">Continue ordering, {username}</Button>
        </div>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;