import React, {useState} from 'react';
import Review from './Review';
import { getUserByToken } from '../Axios/APICalls';
import axios from 'axios';

const ReviewList = ({ restaurantName, restaurantID, reviewData }) => {
    const token = localStorage.getItem("token");
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 0,
        description: ''
    });

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const user = await getUserByToken(token);
            console.log("Here is the user ", user);
            const response = await axios.post('/api/unidish/addNewReview', {
                ...newReview,
                restaurantId: restaurantID,
                userId: user.data.user.id,
                date: new Date().toISOString().slice(0, 10) // Format the date as YYYY-MM-DD
            });
            // Handle response or refresh reviews
            console.log(response);
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting review:', error);
        }

    };

    return (
        <div className='review-list'>
            <h2>Reviews for {restaurantName}</h2>
            {reviewData.map((review, index) => (
                <Review 
                    key={index}
                    userID={review.userID}
                    date={review.date}
                    desc={review.desc}
                    rating={review.rating}
                    likes={review.likes}
                    dislikes={review.dislikes}
                    commentList={review.commentList}
                    reviewId={review.reviewID}
                />
            ))}
            <button onClick={() => setShowForm(!showForm)}>Add Review</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Rating:
                        <input type="number" name="rating" value={newReview.rating} onChange={handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={newReview.description} onChange={handleInputChange}></textarea>
                    </label>
                    <button type="submit">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default ReviewList;