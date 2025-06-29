import { useEffect, useState } from "react";

import { RestaurantCard } from "./RestaurantCard";
import useOnlineStatus from "../customHooks/useOnlineStatus";

export const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [isTopRatedFilter, setIsTopRatedFilter] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleTopRated = () => {
    setIsTopRatedFilter(!isTopRatedFilter);
  };

  const fetchSwiggyAPI = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const restaurantList =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurant(restaurantList);
      setFilteredRestaurant(restaurantList);
    } catch (error) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filterResult = listOfRestaurant.filter((res) => {
      return res.info.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredRestaurant(filterResult);
  };

  useEffect(() => {
    fetchSwiggyAPI();
  }, []);

  useEffect(() => {
    if (isTopRatedFilter) {
      const topRatedRestaurant = listOfRestaurant.filter(
        (res) => res.info.avgRating > 4.5
      );
      setFilteredRestaurant(topRatedRestaurant);
    } else {
      setFilteredRestaurant(listOfRestaurant);
    }
  }, [isTopRatedFilter]);

  return (
    <main className="body">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for restaurants..."
          onChange={onChangeHandler}
          value={searchText}
        />
      </div>
      <div className="filter-container">
        <button
          className={`filter ${isTopRatedFilter ? "active" : ""}`}
          onClick={toggleTopRated}
        >
          Top Rated restaurants
        </button>
      </div>
      <div className="restaurant-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resId={restaurant.info.id}
            cloudinaryImageId={restaurant.info.cloudinaryImageId}
            name={restaurant.info.name}
            cuisine={restaurant.info.cuisines}
            rating={restaurant.info.avgRatingString}
            deliveryTime={restaurant.info?.sla?.slaString}
          />
        ))}
      </div>
    </main>
  );
};
