const ShimmerMenu = () => {
  return (
    <div className="shimmer-menu-container">
      {/* Restaurant header shimmer */}
      <div className="shimmer-header">
        <div className="shimmer-title"></div>
        <div className="shimmer-rating"></div>
        <div className="shimmer-details">
          <div className="shimmer-line short"></div>
          <div className="shimmer-line medium"></div>
          <div className="shimmer-line short"></div>
        </div>
      </div>

      {/* Menu items shimmer */}
      <div className="shimmer-items-container">
        <div className="shimmer-section-title"></div>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="shimmer-item">
            <div className="shimmer-item-content">
              <div className="shimmer-line long"></div>
              <div className="shimmer-line full"></div>
              <div className="shimmer-line short"></div>
            </div>
            <div className="shimmer-image"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerMenu;