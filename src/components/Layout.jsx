import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex justify-center mt-2">
        <Outlet /> {/* Render the child route here */}
      </div>
    </div>
  );
}

export default Layout;
