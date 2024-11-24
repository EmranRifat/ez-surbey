import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import HeaderOne from "components/admin/header/HeaderOne";
import Provider from "components/provider";
import Overlay from "components/admin/overlay";
import CustomSidebar from "./sidebar/sidebar";
import cookies from "js-cookie";

function AdminLayout({ bg, overlay, children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter(); // Initialize useRouter

  // Initialize sidebar visibility based on localStorage
  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarVisible");
    if (storedSidebarState !== null) {
      setSidebarVisible(storedSidebarState === "true");
    }
  }, []);

  // Handle sidebar toggle and persist state in localStorage
  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => {
      localStorage.setItem("sidebarVisible", !prev);
      return !prev;
    });
  };

  // Check for access token and handle redirection
  useEffect(() => {
    const accessToken = cookies.get("access");
    if (!accessToken) {
      router.replace("/login"); // Redirect to login if no token
    } else {
      setIsLoading(false); // Token exists, proceed to load the layout
    }
  }, [router]);

  // Optionally, display a loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Provider>
      <HeaderOne handleSidebar={handleSidebarToggle} showToggleButton={!sidebarVisible} />
      <div className="layout-wrapper flex w-full dark:bg-darkblack-500 bg-[#FAFAFA]">
        {/* Sidebar Section */}
        <div className={`${sidebarVisible ? "block" : "hidden"} sm:block`}>
          <CustomSidebar isCollapsed={!sidebarVisible} />
        </div>

        {/* Main Content Section */}
        <div
          className={`flex-1 transition-all`}
          style={{ width: "75%", important: true }}
        >
          {/* Overlay */}
          {overlay ? overlay : <Overlay />}

          {/* Dashboard Content */}
          <div className={`body-wrapper ${bg || "dark:bg-darkblack-500 bg-[#FAFAFA]"}`}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default AdminLayout;
