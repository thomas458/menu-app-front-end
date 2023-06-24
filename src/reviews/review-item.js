import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteReviewThunk } from "./reviews-thunks";
import { Link } from "react-router-dom";
import {findMealByMealIdThunk} from "../mealdb/mealdb-thunks";

const ReviewItem = ({ review, idMeal }) => {
    const dispatch = useDispatch();
    const {details} = useSelector((state) => state.mealdb)

    // const deleteReviewHandler = (_id) => {
    //     dispatch(deleteReviewThunk(_id));
    // };

    useEffect(() => {
        dispatch(findMealByMealIdThunk(idMeal));
    }, [dispatch, idMeal]);

    const meal = details?.meals?.[0];
    // const meal = details.meals[0];
    console.log(details);
    console.log(idMeal);

    return (
        <li className="list-group-item">
            <div className="row">
                {meal ? (
                    <>
                        <div>{meal.strMeal}</div>
                        <div className="col-4">
                            <Link to={`/details/${meal.idMeal}`}>
                                <img
                                    width={70}
                                    className="rounded float-left"
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
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
