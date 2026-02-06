import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MainLayout() {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
