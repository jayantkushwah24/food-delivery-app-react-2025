import { Link } from "react-router-dom";

export const RestaurantCard = ({ resData }) => {
  const { id, cloudinaryImageId, name, cuisines, avgRatingString, sla } =
    resData.info;

  return (
    <div className="restaurant-card">
      <Link to={`/restaurant/${id}`}>
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
          alt={name}
          className="res-img"
        />
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h4>⭐ {avgRatingString}</h4>
        <h4>⌛ {sla.deliveryTime} mins</h4>
      </Link>
    </div>
  );
};

export const WithPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
