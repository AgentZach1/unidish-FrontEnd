import { useEffect, useState } from "react";
import { getDiningHallsWithRestaurants } from "../Axios/APICalls";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const fetchDiningHallsAndRestaurants = async () => {
    try {
      const res = await getDiningHallsWithRestaurants();

      if (res && res.dining_halls) {
        // console.log(res.dining_halls);
        setData(res.dining_halls);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDiningHallsAndRestaurants();
  }, []);

  const handleRestaurantClick = (rest) => {
    // console.log("CLICKED RESTAURANT: ", rest);
    navigate(`/unidish-test/restaurants/${rest.id}`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {data.length > 0 &&
          data.map((diningHall) => {
            // console.log(diningHall.dining_hall[1]);
            return (
              <div key={diningHall.id}>
                <h3>{diningHall.dining_hall[1]}</h3>
                <ul>
                  {diningHall.restaurants.map((restaurant, i) => (
                    <li
                      key={i}
                      onClick={() => handleRestaurantClick(restaurant)}
                      style={{ cursor: "pointer" }}
                    >
                      {restaurant.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;