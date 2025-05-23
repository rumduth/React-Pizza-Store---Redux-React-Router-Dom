// src/ui/AppLayout.jsx
import { Outlet, useNavigate, useNavigation, useResolvedPath} from "react-router-dom";
import { useSelector } from "react-redux";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const pathName = useResolvedPath();
  const hasValidSession = useSelector((state) => state.user.hasValidSession);
  return (
    <div className="min-h-screen">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header />
          <div className="pt-16 pb-16"> {/* Add padding to account for fixed header */}
            <main className="mx-auto max-w-3xl p-4">
              <Outlet />
            </main>
          </div>
          {!pathName.pathname.startsWith("/cart") && hasValidSession && <CartOverview />}
        </>
      )}
    </div>
  );
}