import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteReviewThunk } from "./reviews-thunks";
import { Link } from "react-router-dom";
import {findMealByMealIdThunk} from "../mealdb/mealdb-thunks";

const ReviewItem = ({ review, idMeal }) => {
    const dispatch = useDispatch();
    const meal = review.details?.meals?.[0];

    return (
        <li className="list-group-item">
            <div className="row">
                {meal ? (
                    <>
                        <div>{meal?.strMeal}</div>
                        <div className="col-4">
                            <Link to={`/details/${meal.idMeal}`}>
                                <img
                                    width={70}
                                    className="rounded float-left"
                                    src={meal?.strMealThumb}
                                    alt={meal?.strMeal}
                                />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div>Loading meal details...</div>
                )}

                <div className="col-8">
                    <div>
                        <span>{review.review} </span>

                        {/*<RxCross2 onClick={() => deleteReviewHandler(review._id)} className="float-end"/>*/}
                    </div>
                    <br />
                </div>
            </div>
        </li>
    );
};

export default ReviewItem;
