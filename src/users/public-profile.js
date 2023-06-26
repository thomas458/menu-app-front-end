import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {findReviewsByAuthor} from "../reviews/reviews-service";
import {useEffect} from "react";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";
import Nav from "../nav";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";

const PublicProfile = () => {
    const{uid} = useParams()
    const {publicProfile, currentUser} = useSelector((state) => state.users);
    const {followers, following} = useSelector((state) => state.follows);
    const {reviews} = useSelector((state) => state.reviews);
    const dispatch = useDispatch()
    const handleFollowBtn = () => {
        dispatch(followUserThunk({
            followed: uid
        }))
    }
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findReviewsByAuthorThunk(uid))
        dispatch(findFollowersThunk(uid))
        dispatch(findFollowingThunk(uid))
    }, [uid])
    console.log("public profile", publicProfile)
    console.log("current User", currentUser)
    return(
        <>
            <Nav/>
            <button
                onClick={handleFollowBtn}
                className="btn btn-success float-end">
                Follow
            </button>
            <h1>{publicProfile && publicProfile.username}</h1>
            <ul className="list-group">
                {
                    reviews && reviews.map((review) =>
                    <Link to={`/details/${review.idMeal}`} className = "list-group-item">
                        {review.review}
                    </Link>
                    )
                }
            </ul>
            <h2>Following</h2>
            <div className="list-group">
                {
                    following && following.map((follow) =>
                        <Link to={`/profile/${follow.followed._id}`} className="list-group-item">
                            {follow.followed.username}

                        </Link>
                    )
                }
            </div>

            <h2>Followers</h2>
            <div className="list-group">
                {
                    followers && followers.map((follow) =>
                        <Link to={`/profile/${follow.follower._id}`} className="list-group-item">
                            {follow.follower.username}

                        </Link>
                    )
                }
            </div>
        </>
    )
}

export default PublicProfile