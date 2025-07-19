import { Link } from "react-router-dom";
import useOnlineStatus from "../customHooks/useOnlineStatus";
import { useSelector } from "react-redux";

export const Header = () => {
  const onlineStatus = useOnlineStatus();

  // subscribing to the store using a selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="header" id="main-header">
      <div className="logo-container" id="logo-section">
        <img
          className="logo"
          id="app-logo"
          src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?ga=GA1.1.704082917.1750601295&semt=ais_hybrid&w=740"
          alt="Food App Logo"
        />
      </div>
      <nav className="nav-items" id="navbar">
        <ul className="nav-list" id="nav-links">
          <li id="online-status">
            {onlineStatus ? "🟢" : "You are offline 🔴"}
          </li>
          <Link to={"/"}>
            <li className="nav-link">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="nav-link">About Us</li>
          </Link>
          <Link to={"/contact"}>
            <li className="nav-link">Contact Us</li>
          </Link>
          <Link to={"/cart"}>
            <li className="nav-link">Cart - {cartItems.length} items</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
