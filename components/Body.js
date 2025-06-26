import { useEffect, useState } from "react";

import { RestaurantCard } from "./RestaurantCard";

export const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [isTopRatedFilter, setIsTopRatedFilter] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleTopRated = () => {
    setIsTopRatedFilter(!isTopRatedFilter);
  };

  const fetchSwiggyAPI = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.17010&lng=79.95700&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();

    setListOfRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
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
            cloudinaryImageId={restaurant.info.cloudinaryImageId}
            name={restaurant.info.name}
            cuisine={restaurant.info.cuisine}
            rating={restaurant.info.avgRatingString}
            deliveryTime={restaurant.info?.sla?.slaString}
          />
        ))}
      </div>
    </main>
  );
};
