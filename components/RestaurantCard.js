import { Link } from "react-router-dom";

export const RestaurantCard = ({
  resId,
  cloudinaryImageId,
  name,
  cuisine,
  rating,
  deliveryTime,
}) => {
  return (
    <div className="restaurant-card">
      <Link to={`/restaurant/${resId}`}>
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt={name}
        className="res-img"
      />
      <h2>{name}</h2>
      <h3>
        {cuisine.join(', ')}
      </h3>
      <h4>⭐ {rating}</h4>
      <h4>⌛ {deliveryTime}</h4>
      </Link>
    </div>
  );
};
