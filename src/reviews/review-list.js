import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findReviewsByAuthorThunk} from "./reviews-thunks";
import ReviewItem from "./review-item";
import reviewItem from "./review-item";
import {findMealsById, findMealsByMealdbId} from "../mealdb/mealdb-service";
import {findMealByMealIdThunk} from "../mealdb/mealdb-thunks";
import {Link} from "react-router-dom";
import {findAllMealsThunk} from "../meals/meals-thunks";


const ReviewList = () => {
    const {reviews, loading} = useSelector(state => state.reviews);
    const {currentUser} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const {meals} = useSelector((state) => state.mealdb)


    useEffect(() => {
        dispatch(findReviewsByAuthorThunk(currentUser._id))
    }, []);

    return (

        <ul className="list-group">
            {loading && (
                <ul className="list-group-item">
                    Loading...
                </ul>
            )}
            <h2>your reviews</h2>
            {reviews.map((review) => (
                <ul key={review._id}>
                    <ReviewItem key={review._id} review={review} />
                </ul>
            ))}
        </ul>
    );
};
export default ReviewList;