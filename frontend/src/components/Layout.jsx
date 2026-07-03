import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />

            <Sidebar isOpen={isOpen} />

            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;