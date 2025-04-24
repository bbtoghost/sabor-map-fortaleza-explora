
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Default to map view when first entering the home page
    if (window.location.pathname === "/home") {
      navigate("/home/map");
    }
  }, [navigate]);

  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default HomePage;
