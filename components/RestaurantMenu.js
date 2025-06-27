import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer"; // Create a shimmer loading component
import Error from "./Error"; // Create an error component

const RestaurantMenu = () => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { resId } = useParams();

  const fetchMenuAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7195687&lng=75.8577258&restaurantId=${resId}&submitAction=ENTER`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setResData(json);
      console.log(json);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuAPI();
  }, [resId]); // Added resId to dependency array

  if (loading) return <Shimmer />;
  if (error) return <Error message={error} />;
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
          <p className="cost">{costForTwo}</p>
          <p className="delivery-time">Delivery in {sla?.deliveryTime} mins</p>
        </div>
      </div>

      <div className="menu-section">
        <h2 className="menu-title">Menu</h2>
        <div className="menu-items">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item.card.info.id} className="menu-item">
                <h3>{item.card.info.name}</h3>
                <p>{item.card.info.description}</p>
                <p>
                  ₹
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </p>
              </div>
            ))
          ) : (
            <p className="no-items">No menu items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
