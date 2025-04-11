import { Outlet, useNavigation, useResolvedPath } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const pathName = useResolvedPath();
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
