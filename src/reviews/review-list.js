import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findReviewsByAuthorThunk } from "./reviews-thunks";
import ReviewItem from "./review-item";
import {findMealByMealIdThunk} from "../mealdb/mealdb-thunks";

const ReviewList = () => {
    const { reviews, loading } = useSelector((state) => state.reviews);
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findReviewsByAuthorThunk(currentUser._id));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        const mealIds = reviews.map((review) => review.idMeal);
        dispatch(findMealByMealIdThunk(mealIds));
    }, [dispatch, reviews]);

    return (
        <div>
            <h2 className="ms-5">Your Reviews</h2>
            {loading ? (
                <div>Loading reviews...</div>
            ) : (
                <ul className="list-group">
                    {reviews.map((review) => (
                        <ReviewItem key={review._id} review={review} idMeal={review.idMeal}/>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;
