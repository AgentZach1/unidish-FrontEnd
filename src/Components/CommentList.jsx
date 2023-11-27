import Comment from './Comment';
import React, {useState, useEffect} from 'react';
import { getBaseCommentsByReview } from '../Axios/APICalls';

const CommentList = ({reviewID}) => {
    const [cData, setCData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commData = await getBaseCommentsByReview(reviewID);
                console.log("Getting comments");
                console.log(commData);
                setCData(commData);
            } catch (error) {
                console.error('Error fetching comment base ', error);
            }
        };

        fetchData();
    }, []);

    // Uses reviewID -> props for Comment Component
    // Get list of comments with NULL comment_comment_id and equal reviewID from API call
    if (!cData) {
        return (
            <div className="comment-list">
                Loading list of comments...
            </div>
        )
    }

    return (
        <div className="comment-list">
            Comments
            {cData.comments.map((comment, index) => (
                <Comment
                    id={index}
                    comment_id={comment.Comment_ID}
                    desc={comment.Description}
                    user_id={comment.User_ID}
                    review_id={comment.Review_ID}
                    c_c_id={comment.Comment_Comment_ID}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                />
            ))}
        </div>
    );
};

export default CommentList;