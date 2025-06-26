export const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?ga=GA1.1.704082917.1750601295&semt=ais_hybrid&w=740"
          alt="Food App Logo"
        />
      </div>
      <nav className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </nav>
    </header>
  );
};
