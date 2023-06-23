import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findReviewsByAuthorIdThunk } from "./reviews-thunks";
import { findMealByMealIdThunk } from "../mealdb/mealdb-thunks";

const UserReviews = () => {
    const { idMeal } = useParams();
    const { currentUser } = useSelector((state) => state.users);
    const { reviews } = useSelector((state) => state.reviews);
    const { details } = useSelector((state) => state.mealdb);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findReviewsByAuthorIdThunk(currentUser._id));
        dispatch(findMealByMealIdThunk(idMeal));
    }, []);

    console.log("Details:", details); // Debug statement

    if (!details) {
        return <div>Loading meal details...</div>;
    }

    return (
        <div>
            <h2>Your recent review</h2>
            {reviews.map((review) => (
                <div key={review._id.$oid}>
                    <p>{review.review}</p>
                    {details.idMeal === review.idMeal && (
                        <img src={details.strMealThumb} alt={details.strMeal} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default UserReviews;
