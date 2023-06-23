import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findReviewsByAuthorThunk, getFiveRecentReviewsThunk} from "./reviews-thunks";
import ReviewItem from "./review-item";
import reviewItem from "./review-item";
import {findMealsById, findMealsByMealdbId} from "../mealdb/mealdb-service";
import {findMealByMealIdThunk} from "../mealdb/mealdb-thunks";
import {Link} from "react-router-dom";
import {findAllMealsThunk} from "../meals/meals-thunks";


const RecentReviews = () => {
    const {reviews, loading} = useSelector(state => state.reviews);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getFiveRecentReviewsThunk())
    }, []);

    return (

        <ul className="list-group">
            {loading && (
                <ul className="list-group-item">
                    Loading...
                </ul>
            )}
            <h2>Recent reviews</h2>
            {reviews.map((review) => (
                <ul key={review._id}>
                    <ReviewItem key={review._id} review={review} />
                </ul>
            ))}
        </ul>
    );

};
export default RecentReviews;