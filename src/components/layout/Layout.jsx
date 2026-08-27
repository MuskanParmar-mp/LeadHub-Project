import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F8FA]">

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />


      {/* Main Area */}
      <div className="lg:ml-64 min-h-screen">

        {/* Navbar */}
        <Navbar
          setIsOpen={setIsOpen}
        />


        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;