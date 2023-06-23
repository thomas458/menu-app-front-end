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
            "__v": 0
        }
    }
) => {
    const dispatch = useDispatch();
    const deleteReviewHandler = (_id) => {
        dispatch(deleteReviewThunk(_id));
    }
    console.log(review);
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    {/*<img width={70} className="rounded-circle float-end rounded-3" src={`/images/${tuit.image}`}/>*/}
                </div>

                <div className="col-10">

                    <div><span className="fw-bolder">{review.review} </span>
                        {review.author}
                        <RxCross2 onClick={() => deleteReviewHandler(review._id)} className="float-end"/></div>
                    <div>{review.review}</div>
                    <br/>
                </div>
            </div>
        </li>
    );
};
export default ReviewItem;