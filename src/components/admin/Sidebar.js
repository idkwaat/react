import { NavLink } from "react-router-dom";
export default function Sidebar() {
    return(
        <>
                <nav id="sidebar">
            <div className="sidebar-header">
                <img src="assets/img/bootstraper-logo.png" alt="bootraper logo" className="app-logo"/>
            </div>
            <ul className="list-unstyled components text-secondary">
                <li>
                    <NavLink to="/admin/dashboard" style={{ color: "#00bcd4", textDecoration: "none" }} className={({ isActive }) => isActive ? "active" : ""}>
  <i className="fas fa-home"></i> Dashboard
</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/products" style={{ color: "#00bcd4", textDecoration: "none" }} className={({ isActive }) => isActive ? "active" : ""}>
  <i className="fas fa-home"></i> Product
</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/categories" style={{ color: "#00bcd4", textDecoration: "none" }} className={({ isActive }) => isActive ? "active" : ""}>
  <i className="fas fa-home"></i> Category
</NavLink>
                </li>

                                <li>
                    <NavLink to="/admin/orders" style={{ color: "#00bcd4", textDecoration: "none" }} className={({ isActive }) => isActive ? "active" : ""}>
  <i className="fas fa-home"></i> Orders
</NavLink>
                </li>
                                <li>
                    <NavLink to="/" style={{ color: "#00bcd4", textDecoration: "none" }} className={({ isActive }) => isActive ? "active" : ""}>
   <i className="fas fa-arrow-left"></i> Back To Client
</NavLink>
                </li>


                
            </ul>
        </nav>
        </>
    )
}
