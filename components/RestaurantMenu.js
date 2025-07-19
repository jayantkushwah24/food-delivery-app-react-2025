import { useParams } from "react-router-dom";
import useRestaurantMenu from "../customHooks/useRestaurantMenu.js";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice.js";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
  };

  const resData = useRestaurantMenu(resId);

  if (!resData) return null;

  // Safely access nested properties with optional chaining
  const restaurantInfo = resData?.data?.cards[2]?.card?.card?.info || {};
  const menuItems =
    resData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards || [];

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

      <div className="menu-section">
        <h2 className="menu-title">Menu</h2>
        <div className="menu-items">
          {menuItems.length > 0 ? (
            menuItems.map((item) => {
              const { id, imageId, name, description, price, defaultPrice } =
                item.card.info;
              return (
                <div key={id} className="menu-item">
                  <img
                    src={`https://media-assets.swiggy.com/${imageId}`}
                    alt={name}
                    className="cart-item-img"
                  />
                  <h3 className="item-name">{name}</h3>
                  <p className="item-description">{description}</p>
                  <p className="item-price">
                    ₹{price / 100 || defaultPrice / 100}
                  </p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddItem(item)}
                  >
                    Add +
                  </button>
                </div>
              );
            })
          ) : (
            <p className="no-items">No menu items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
