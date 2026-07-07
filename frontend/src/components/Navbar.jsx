function Navbar({ toggleSidebar }) {
    return (
        <nav>
            <button onClick={toggleSidebar}>
                ☰
            </button>

            <h2 id="nav-header">BG FIREWORKS</h2>
        </nav>
    );
}

export default Navbar;