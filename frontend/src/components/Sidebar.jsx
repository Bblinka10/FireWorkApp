import { Link } from "react-router-dom";

function Sidebar({ isOpen }) {
    return (
        <div className={isOpen ? "sidebar open" : "sidebar"}>
            <Link to="/">Inventory</Link>
            <Link to="/sale">Sale</Link>
        </div>
    );   
}

export default Sidebar;