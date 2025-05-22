// src/ui/AppLayout.jsx
import { Outlet, useNavigation, useResolvedPath, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDiningOption, updateName, createSession } from "../features/user/userSlice";


export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const pathName = useResolvedPath();
  const hasValidSession = useSelector((state) => state.user.hasValidSession);
  const dispatch = useDispatch();

  //Help to retrieve user infomration in the localStorage
  useEffect(function(){
    const username = localStorage.getItem('username') ?? '';
    const diningOption = localStorage.getItem('diningOption') ?? '';
    if(!username || !diningOption) return;
    dispatch(updateName(username));
    dispatch(setDiningOption(diningOption));
    dispatch(createSession());
  },[]);

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
          {!pathName.pathname.startsWith("/cart") && hasValidSession && <CartOverview />}
        </>
      )}
    </div>
  );
}