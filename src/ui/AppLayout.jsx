// src/ui/AppLayout.jsx
import { Outlet, useNavigation, useResolvedPath, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const pathName = useResolvedPath();
  const location = useLocation();
  
  const hasValidSession = useSelector((state) => state.user.hasValidSession);
  
  // If no valid session and not already on home page, redirect to home
  if (!hasValidSession && location.pathname !== "/") {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header></Header>
          <div>
            <main className="mx-auto max-w-3xl">
              <Outlet />
            </main>
          </div>
          {!pathName.pathname.startsWith("/cart") && <CartOverview />}
        </>
      )}
    </div>
  );
}