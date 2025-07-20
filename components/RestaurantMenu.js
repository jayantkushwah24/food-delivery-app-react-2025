import { useParams } from "react-router-dom";
import useRestaurantMenu from "../customHooks/useRestaurantMenu.js";
import MenuListCard from "./MenuListCard.js";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resData = useRestaurantMenu(resId);

  if (!resData) return null;

  // Safely access nested properties with optional chaining
  const restaurantInfo = resData?.data?.cards[2]?.card?.card?.info || {};

  const {
    name = "Restaurant",
    avgRating = 0,
    totalRatings = 0,
    costForTwo = "",
    cuisines = [],
    locality = "",
    areaName = "",
    sla = {},
  } = restaurantInfo;

  return (
    <div className="restaurant-menu">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{name}</h1>
        <div className="restaurant-rating">
          <span className="rating">⭐ {avgRating}</span>
          <span className="rating-count">({totalRatings} ratings)</span>
        </div>
        <div className="restaurant-details">
          <p className="cuisines">{cuisines.join(", ")}</p>
          <p className="location">{locality || areaName}</p>
          <p className="cost">₹{costForTwo / 200}</p>
          <p className="delivery-time">Delivery in {sla?.deliveryTime} mins</p>
        </div>
      </div>

      <MenuListCard resData={resData} />
    </div>
  );
};

export default RestaurantMenu;
