import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ReviewItem = ({ review, idMeal }) => {
    const dispatch = useDispatch();
    const meal = review.details?.meals?.[0];

    return (
        <div className="card h-100 mt-3">
            {meal ? (
                <Link to={`/details/${meal.idMeal}`} className="link-underline-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="text-black">{meal?.strMeal}</div>
                            <div className="col-4">
                                <img
                                    width={80}
                                    className="rounded float-left"
                                    src={meal?.strMealThumb}
                                    alt={meal?.strMeal}
                                />
                            </div>
                            <div className="col-8">
                                <div className="card-text text-black">{review.review}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="card-body">
                    <div>Loading meal details...</div>
                </div>
            )}
        </div>
    );
};

export default ReviewItem;
