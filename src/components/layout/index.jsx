import React from "react";
import MobileNavigation from "@components/layout/bottomnav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Layout;
