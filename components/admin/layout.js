import { useState, useEffect } from "react";
import HeaderOne from "components/admin/header/HeaderOne";
import Provider from "components/provider";
import Overlay from "components/admin/overlay";
import CustomSidebar from "./sidebar/sidebar";

function AdminLayout({ bg, overlay, children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    // Example: Initialize sidebar visibility based on localStorage
    const storedSidebarState = localStorage.getItem("sidebarVisible");
    if (storedSidebarState !== null) {
      setSidebarVisible(storedSidebarState === "true");
    }
  }, []);

  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => {
      localStorage.setItem("sidebarVisible", !prev);
      return !prev;
    });
  };

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
          <div className={`body-wrapper  ${bg || "dark:bg-darkblack-500 bg-[#FAFAFA]"}`}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default AdminLayout;
