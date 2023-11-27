import {getCommentsFromComment, getUserByToken} from '../Axios/APICalls';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Comment = ({comment_id, desc, user_id, review_id, c_c_id, likes, dislikes}) => {
    const token = localStorage.getItem("token");
    const [cData, setCData] = useState();
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({
        description: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commData = await getCommentsFromComment(comment_id);
                console.log("Getting comments from current comment");
                console.log(commData);
                setCData(commData);
            } catch (error) {
                console.error('Error fetching comment base ', error);
            }
        };

        fetchData();
    }, []);

    const handleLike = async () => {
        try {
            // console.log(reviewId, userID);
            const user = await getUserByToken(token);
            await axios.post('/api/unidish/likeComment', { userId: user.data.user.id, commentId: comment_id });
            // Logic to update UI based on successful response (optional)
        } catch (error) {
            console.error('Error liking review:', error);
        }
    };

    const handleDislike = async () => {
        try {
            // console.log(reviewId, userID);
            const user = await getUserByToken(token);
            await axios.post('/api/unidish/dislikeComment', { userId: user.data.user.id, commentId: comment_id });
            // Logic to update UI based on successful response (optional)
        } catch (error) {
            console.error('Error disliking review:', error);
        }
    };
    
    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const user = await getUserByToken(token);
            console.log("Here is the user ", user);
            const response = await axios.post('/api/unidish/addNewComment', {
                ...newReview,
                userID: user.data.user.id,
                reviewID: review_id,
                Comment_Comment_ID: comment_id // Format the date as YYYY-MM-DD
            });
            // Handle response or refresh reviews
            console.log(response);
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }

    };

    if (!cData) {
        return (
            <div className="comment">
            <ul>
                <li>Comment ID: {comment_id}</li>
                <li>Description: {desc}</li>
                <li>User ID: {user_id}</li>
                <li>Review ID: {review_id}</li>
                <li>Comment Comment ID: {c_c_id}</li>
                <li>
                    <button onClick={handleLike}>Like</button>
                    <button onClick={handleDislike}>Dislike</button>
                </li>
                <li>Likes: {likes}</li>
                <li>Dislikes: {dislikes}</li>
            </ul>
            </div>
        );
    }

    // Displays commentData
    // Gets any comment with current comment_ID as its comment_comment_id
    return (
        <div className="comment">
            <ul>
                <li>Comment ID: {comment_id}</li>
                <li>Description: {desc}</li>
                <li>User ID: {user_id}</li>
                <li>Review ID: {review_id}</li>
                <li>Comment Comment ID: {c_c_id}</li>
                <li>
                    <button onClick={handleLike}>Like</button>
                    <button onClick={handleDislike}>Dislike</button>
                </li>
                <li>Likes: {likes}</li>
                <li>Dislikes: {dislikes}</li>
            </ul>
            <button onClick={() => setShowForm(!showForm)}>Add Comment</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Description:
                        <textarea name="description" value={newReview.description} onChange={handleInputChange}></textarea>
                    </label>
                    <button type="submit">Submit Comment</button>
                </form>
            )}
            <div className='comments-on-comment'>
                {cData.comments.map((c, index) => (
                    <Comment
                    id={index}
                    comment_id={c.Comment_ID}
                    desc={c.Description}
                    user_id={c.User_ID}
                    review_id={c.Review_ID}
                    c_c_id={c.Comment_Comment_ID}
                    likes={c.likes}
                    dislikes={c.dislikes}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comment;