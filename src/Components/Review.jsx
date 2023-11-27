import React from 'react';
import axios from 'axios';
import CommentList from './CommentList';

const Review = ({userID, date, desc, rating, likes, dislikes, commentList, reviewId}) => {

    const renderUserProfileLink = () => {
        if (userID === 'self') {
            // Link to regular profile page
            return <a href="/profile">Profile</a>;
        } else {
            // Link to external profile page
            return <a href={`/unidish-test/user/${userID}`}>User: {userID}</a>;
        }
    };

    const handleLike = async () => {
        try {
            console.log(reviewId, userID);
            await axios.post('/api/unidish/likeReview', { userId: userID, reviewId: reviewId });
            // Logic to update UI based on successful response (optional)
        } catch (error) {
            console.error('Error liking review:', error);
        }
    };

    const handleDislike = async () => {
        try {
            console.log(reviewId, userID);
            await axios.post('/api/unidish/dislikeReview', { userId: userID, reviewId: reviewId });
            // Logic to update UI based on successful response (optional)
        } catch (error) {
            console.error('Error disliking review:', error);
        }
    };

    return (
        <div className="review">
            <ul>
                <li>Posted by {renderUserProfileLink()}</li>
                <li>Date: {date}</li>
                <li>Description: {desc}</li>
                <li>Rating: {rating}</li>
                <li>
                    <button onClick={handleLike}>Like</button>
                    <button onClick={handleDislike}>Dislike</button>
                </li>
                <li>Likes: {likes}</li>
                <li>Dislikes: {dislikes}</li>
                <li>
                    <CommentList
                        reviewID={reviewId}
                    />
                </li>
            </ul>
        </div>
    );
};

export default Review;