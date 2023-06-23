import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findReviewsByAuthorThunk} from "./reviews-thunks";
import ReviewItem from "./review-item";
import reviewItem from "./review-item";


const ReviewList = () => {
    const {reviews, loading} = useSelector(state => state.reviews)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findReviewsByAuthorThunk(currentUser._id))
    }, [])
    return (
        <ul className="list-group">
            {loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                reviews.map(review =>
                    <ReviewItem
                        key={review._id} review={review}/>)
            }
        </ul>
    );
};
export default ReviewList;