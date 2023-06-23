import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findReviewsByAuthor} from "../reviews/reviews-service";
import {useEffect} from "react";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";

const PublicProfile = () => {
    const{uid} = useParams()
    const {publicProfile} = useSelector((state) => state.users);
    const {reviews} = useSelector((state) => state.reviews);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findReviewsByAuthorThunk(uid))
    }, [])
    return(
        <>
            <h1>{publicProfile && publicProfile.username}</h1>
            <ul>
                {
                    reviews && reviews.map((review) =>
                    <li>
                        <Link to={`/details/${review.idMeal}`}/>
                            {review.review} {review.idMeal}
                    </li>
                    )
                }
            </ul>
        </>
    )
}

export default PublicProfile