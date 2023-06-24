import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RxCross2} from "react-icons/rx";
import {deleteReviewThunk} from "./reviews-thunks";
import {findMealByMealIdThunk} from "../mealdb/mealdb-thunks";
import {Link} from "react-router-dom";


const ReviewItem = (
    {
        review = {
            "_id": "649553baf9ffa4b3f395f163",
            "review": "The pie looks good",
            "idMeal": "52880",
            "author": "64953033970955fade5a0661",
            "time": "2023-06-23T22:45:23.635+00:00",
            "__v": 0
        },
        mealName
    }
) => {
    const idMeal = review.idMeal;
    const dispatch = useDispatch();
    const {details} = useSelector((state) => state.mealdb)
    const deleteReviewHandler = (_id) => {
        dispatch(deleteReviewThunk(_id));
    }
    useEffect(() => {
        dispatch(findMealByMealIdThunk(idMeal));
    }, []);

    // const meal = details && details.length > 0 ? details.meals[0] : null;
    // // console.log(details);
    // console.log(meal);
    return (
        <>
            {/*<pre>{JSON.stringify(details, null, 2)}</pre>*/}
            <li className="list-group-item">
                <div className="row">
                    {details && details.meals ? (
                        <>
                            <div>{details.meals[0].strMeal}</div>
                            <div className="col-4">
                                <Link to={`/details/${details.meals[0].idMeal}`}>
                                    <img
                                        width={70}
                                        className="rounded float-left"
                                        src={details.meals[0].strMealThumb}
                                        alt={details.meals[0].strMeal}
                                    />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div>Loading meal...</div>
                    )}

                    <div className="col-8">
                        <div>
                            <span>{review.review} </span>
                            {/*<RxCross2 onClick={() => deleteReviewHandler(review._id)} className="float-end"/>*/}
                        </div>
                        <br/>
                    </div>
                </div>
            </li>
        </>
    );
};
export default ReviewItem;