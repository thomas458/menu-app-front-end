import {useDispatch, useSelector} from "react-redux";
import Nav from "../nav";
import {logoutThunk, profileThunk, updateUserThunk} from "./users-thunk";
import {findReviewsByLoginUserThunk} from "../reviews/reviews-thunks"
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
  findFollowersThunk,
  findFollowingThunk
} from "../follows/follows-thunks";
import * as service from "../likes/likes-service";

const Profile = () => {
    const {currentUser} = useSelector((state) => state.users)
    console.log(currentUser)
    const [profile, setProfile] = useState(currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userReviews} = useSelector((state) => state.reviews);

  const [albumsIlike, setAlbumsIlike] = useState([]);
  const fetchMyLikes = async () => {
    const albums = await service.findAlbumsILike();
    setAlbumsIlike(albums);
  };

  const {followers, following} = useSelector((state) => state.follows);
    const handleLogout = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    const handleUpdate = async () => {
        try {
            await dispatch(updateUserThunk(profile));
            console.log("profile", profile)
        }catch (error){
            console.error(error);
        }
    }
    useEffect(() => {
      fetchMyLikes();
        const fetchProfile = async () => {
            try{
                const {payload} = await dispatch(profileThunk());
                await dispatch(findReviewsByLoginUserThunk(payload._id))
                setProfile(payload);
              dispatch(findFollowersThunk(currentUser._id))
              dispatch(findFollowingThunk(currentUser._id))
                console.log("payload", payload)
            }catch(error) {
                console.log("login")
                console.error(error);
                navigate('/login')
            }

        };
        fetchProfile();
    },[]);

    return(
        <>
            <Nav/>
            <h1>Profile</h1>
            {
                currentUser && <h2>Welcome {currentUser.username}</h2>
            }
            <ul>
                {
                    userReviews && userReviews.map((review) =>
                        <li>
                            <Link to={`/details/${review.idMeal}`}>
                            {review.review} {review.idMeal}
                            </Link>
                        </li>
                    )
                }
            </ul>
            <label>Username</label>
            <input
                className="form-control"
                value={profile ? profile.username : ""}
                readOnly
            />
            <label>Password</label>
            <input
                className="form-control"
                value={profile ? profile.password : ""}
                type="password"
                onChange={(e) => setProfile({...profile, password: e.target.value})}
            />
            <label>First Name</label>
            <input
                className="form-control"
                value={profile ? profile.firstName : ""}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            />
            <label>Last Name</label>
            <input
                className="form-control"
                value={profile ? profile.lastName : ""}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            />
            <button onClick={handleUpdate} className="btn btn-primary">Update</button>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>

          <h2>Following</h2>
          <div className="list-group">
            {
                following && following.map((follow) =>
                    <Link to={`/profile/${follow.followed._id}`} className="list-group-item">
                        {follow.followed.username  ?? ""}
                    </Link>
                )
            }
          </div>

          <h2>Followers</h2>
          <div className="list-group">
            {
                followers && followers.map((follow) =>
                    <Link to={`/profile/${follow.follower._id}`} className="list-group-item">
                      {follow.follower.username  ?? ""}

                    </Link>
                )
            }
          </div>

          <pre>{JSON.stringify(albumsIlike, null, 2)}</pre>

        </>
    )
}

export default Profile