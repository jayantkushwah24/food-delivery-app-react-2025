export const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisine,
  rating,
  deliveryTime,
}) => {
  return (
    <div className="restaurant-card">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt={name}
        className="res-img"
      />
      <h2>{name}</h2>
      <h3>{cuisine}</h3>
      <h4>⭐ {rating}</h4>
      <h4>⌛ {deliveryTime}</h4>
    </div>
  );
};
