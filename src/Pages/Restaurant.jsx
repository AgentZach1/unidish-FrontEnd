import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMenuItemsForRestaurant,
  getRestaurantById,
} from "../Axios/APICalls";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState();
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const rest = await getRestaurantById(restaurantId);
        const menu = await getMenuItemsForRestaurant(restaurantId);
        console.log(menu);
        console.log(rest);
        setRestaurant(rest);
        setMenuItems(menu);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]); // Adding restaurantId as a dependency
  return (
    <div>
      {restaurant && menuItems && (
        <>
          <div>
            {restaurant.restaurant.Name}
            <ul>
            {restaurant.restaurant.Description}
            </ul>
            {restaurant.restaurant.Menu_Name} 
            <ul>
            {restaurant.restaurant.Menu_Description}
            </ul>
          </div>
          <ul>
          {menuItems.menu_items.map((item) => (
            <div key={item.Menu_Item_ID}>
              Name: {item.Name}
              <li>
              Price: {item.Price}
              </li>
              <li>
              Description: {item.Description}
              </li>
              <li>
              Calorie Count: {item.Calorie_Count}
              </li>
            </div>
          ))}
        </ul>
        </>
        
      )}
    </div>
  );
};

export default Restaurant;