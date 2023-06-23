import React from "react";
import {useDispatch} from "react-redux";
import {RxCross2} from "react-icons/rx";
import {deleteReviewThunk} from "./reviews-thunks";


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
    const dispatch = useDispatch();
    const deleteReviewHandler = (_id) => {
        dispatch(deleteReviewThunk(_id));
    }
    console.log(review);
    return (
        <>
            {/*<pre>{JSON.stringify(review, null, 2)}</pre>*/}
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    {/*<img width={70} className="rounded-circle float-end rounded-3" src={`/images/${tuit.image}`}/>*/}
                </div>

                <div className="col-10">
                    <div>
                        <span>{review.review} </span>
                        <span>{review.idMeal}</span>
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