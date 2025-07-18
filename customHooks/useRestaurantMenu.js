import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenuAPI();
  }, []);
  const fetchMenuAPI = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7195687&lng=75.8577258&restaurantId=${resId}&submitAction=ENTER`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setResInfo(json);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;

// https://thingproxy.freeboard.io/fetch/