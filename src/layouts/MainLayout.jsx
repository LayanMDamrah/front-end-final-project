import { Outlet } from "react-router";
import Footer from "../componnents/Footer";
import NavBar from "../componnents/NavBar/NavBar";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
