import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const MenuListCard = ({ resData }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const cards =
    resData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const menu = cards.filter((card) => card?.card?.card?.title);

  const renderDishes = (items) =>
    items.map(({ card: { info } }) => {
      console.log(info);

      const { id, name, price, description, isVeg, imageId, defaultPrice } =
        info;
      return (
        <div key={id} className="menu-item">
          <div className={`veg-icon ${isVeg ? "veg" : "non-veg"}`}></div>

          {imageId && (
            <img
              src={`https://media-assets.swiggy.com/${imageId}`}
              alt={name}
              className="menu-item-img"
            />
          )}

          <div className="menu-item-details">
            <h5>{name}</h5>
            <p className="price">₹{price ? price / 100 : defaultPrice / 100}</p>
            <p>{description}</p>
            <button type="button" onClick={() => handleAddItem(info)}>
              Add +
            </button>
          </div>
        </div>
      );
    });

  return (
    <div id="menu-list" className="menu-list">
      {menu.map((section, index) => {
        const { categoryId, title, categories, itemCards, carousel } =
          section.card.card;

        const sectionKey = categoryId || `${title}-${index}`;

        return (
          <div key={sectionKey} className="menu-category">
            <h2>{title}</h2>

            {carousel && (
              <div className="menu-items-container">
                {carousel.map((carouselItem) => {
                  const info = carouselItem?.dish?.info;
                  return info?.id ? (
                    <div key={info.id}>
                      {renderDishes([{ card: { info } }])}
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {itemCards && (
              <div className="menu-items-container">
                {renderDishes(itemCards)}
              </div>
            )}

            {categories &&
              categories.map((cat, catIndex) => (
                <div
                  key={`${cat.title}-${catIndex}`}
                  className="menu-subcategory"
                >
                  <h3>{cat.title}</h3>
                  <div className="menu-items-container">
                    {renderDishes(cat.itemCards)}
                  </div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default MenuListCard;
