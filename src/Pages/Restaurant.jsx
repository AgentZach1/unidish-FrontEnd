import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMenuItemsForRestaurant,
  getRestaurantById,
  getReviewsFromRestaurant,
} from "../Axios/APICalls";
import ReviewList from "../Components/ReviewList";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState();
  const [menuItems, setMenuItems] = useState();
  const [reviewData, setReviewData] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const rest = await getRestaurantById(restaurantId);
        const menu = await getMenuItemsForRestaurant(restaurantId);
        const reviews = await getReviewsFromRestaurant(restaurantId);
        console.log(menu);
        console.log(rest);
        console.log(reviews);
        setRestaurant(rest);
        setMenuItems(menu);
        setReviewData(reviews);
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [restaurantId]); // Adding restaurantId as a dependency
  return (
    <div>
      {restaurant && menuItems && reviewData && (
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
          <div className="review-list-page">
              <ReviewList
                  restaurantName={restaurant.restaurant.Name}
                  restaurantID={restaurant.restaurant.Restaurant_ID}
                  reviewData={reviewData.reviews.map(review => ({
                    userID: review.User_ID,
                    date: review.Date,
                    desc: review.Description,
                    rating: review.Rating,
                    likes: review.likes,
                    dislikes: review.dislikes,
                    commentList: [],
                    reviewID: review.Review_ID
                  }))}
              />
          </div>
        </>
        
      )}
    </div>
  );
};

export default Restaurant;