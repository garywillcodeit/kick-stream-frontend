import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import RightNavBar from "./navbars/RightNavBar";
import LeftNavBar from "./navbars/LeftNavBar";
import Header from "./Header";
import MobileNavBar from "./navbars/MobileNavBar";

export default function Navigation() {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      document.documentElement.style.height = `${window.innerHeight}px`;
    }, 1000);
  }, [window.innerHeight]);

  return (
    <>
      <LeftNavBar />
      <Outlet />
      <RightNavBar />
      <Header />
      <MobileNavBar originPage={"Home"} />
    </>
  );
}
