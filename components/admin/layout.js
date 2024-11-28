import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeaderOne from "components/admin/header/HeaderOne";
import Provider from "components/provider";
import Overlay from "components/admin/overlay";
import CustomSidebar from "./sidebar/sidebar";
import cookies from "js-cookie";

function AdminLayout({ bg, overlay, children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
      router.replace("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Optionally, display a loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Provider>
      <HeaderOne
        handleSidebar={handleSidebarToggle}
        showToggleButton={!sidebarVisible}
      />
      <div className="layout-wrapper flex w-full dark:bg-darkblack-500 bg-[#F4F4F5]">
        {/* Sidebar Section */}
        <div className={`${sidebarVisible ? "block" : "hidden"} sm:block`}>
          <CustomSidebar isCollapsed={!sidebarVisible} />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 transition-all w-full sm:w-3/4 lg:w-1/2">
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
