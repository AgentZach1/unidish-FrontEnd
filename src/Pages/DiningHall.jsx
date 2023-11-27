import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewList from '../Components/ReviewList';
import {
  getDiningHallsWithRestsReviewsLikesDislikes
} from "../Axios/APICalls";

const DiningHall = () => {

  const [diningHalls, setDiningHalls] = useState([]);
    // console.log(selectedRestaurant);

    /**
     * Gets REVIEW by Restaurant Header
     * Each review component has:
     * Posted by <user> (id)
     * 
     * Structure:
     * Dining Halls in DBMS
     * |_Restaurant (Header)
     * |  |_Review_List Component
     * |    |_Review Component
     * |    | |_Posted by <user> (button to external profile page IF self then regular profile page)
     * |    | |_Date
     * |    | |_Description
     * |    | |_Rating
     * |    | |_Likes/Dislikes
     * |    | |_Comment_List Component
     * |    |   |_Comment Component
     * |    |_Review
     * |_Restaurant
     *    |_Review_List
     */

    useEffect(() => {
      const fetchData = async () => {
        try {
          // const response = await axios.get('/api/unidish/getDiningHallsWithRestaurantsAndReviews');
          // const halls = response.data.dining_halls;

          //       for (const hall of halls) {
          //           for (const restaurant of hall.restaurants) {
          //               for (const review of restaurant.reviews) {
          //                   const likesDislikesResponse = await axios.get(`/api/unidish/reviewLikesDislikesCount?reviewId=${review.Review_ID}`);
          //                   review.likes = likesDislikesResponse.data.likes;
          //                   review.dislikes = likesDislikesResponse.data.dislikes;
          //               }
          //           }
          //       }
          const halls = await getDiningHallsWithRestsReviewsLikesDislikes();
          console.log(halls);
          setDiningHalls(halls);
        } catch (error) {
          console.error('Error fetching dining halls:', error);
        }
      };
  
      fetchData();
    }, []);


    return (
      <div className='review-list'>
      <h2>Dining Hall Reviews</h2>
      {diningHalls.map((hall, index) => (
        <div key={index}>
          <h3>{hall.Name}</h3>
          {hall.restaurants.map((restaurant, idx) => (
            <div key={idx}>
              <h4>{restaurant.Name}</h4>
              <ReviewList 
                restaurantName={restaurant.Name} 
                restaurantID={restaurant.Restaurant_ID}
                reviewData={restaurant.reviews.map(review => ({
                  userID: review.User_ID,
                  date: review.Date,
                  desc: review.Description,
                  rating: review.Rating,
                  // Assuming likes and dislikes are not directly available
                  likes: review.likes, // Replace with actual data if available
                  dislikes: review.dislikes, // Replace with actual data if available
                  commentList: [], // Replace with actual data if available
                  reviewID: review.Review_ID
                }))} 
              />
            </div>
          ))}
        </div>
      ))}
    </div>
    );
  };
  
  export default DiningHall;