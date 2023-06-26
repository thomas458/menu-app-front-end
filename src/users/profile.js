import {useDispatch, useSelector} from "react-redux";
import Nav from "../nav";
import {logoutThunk, profileThunk, updateUserThunk} from "./users-thunk";
import {
  deleteReviewThunk,
  findReviewsByLoginUserThunk
} from "../reviews/reviews-thunks"
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
  const [del, setDel] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userReviews} = useSelector((state) => state.reviews);
    const lastpage = () => {
        navigate(-1);
    };
  const [albumsIlike, setAlbumsIlike] = useState([]);
  const fetchMyLikes = async () => {
    const albums = await service.findAlbumsILike();
    setAlbumsIlike(albums);
  };

  const {followers, following} = useSelector((state) => state.follows);
    const handleLogout = async () => {
        await dispatch(logoutThunk())
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

  const handledelete = async (rid) => {
    try {
      await dispatch(deleteReviewThunk(rid));
      setDel(!del);
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
    },[del]);

    return(
        <div className="container-fluid">
            <Nav/>
            <button className="btn btn-primary" onClick={lastpage}>Back</button>
            <button className="btn btn-danger float-end" onClick={handleLogout}>
                Logout
            </button>
            {
                currentUser && <h2>Welcome {currentUser.username}</h2>
            }
            <label className="mt-2 mb-1">Username</label>
            <input
                className="form-control"
                value={profile ? profile.username : ""}
                readOnly
            />
            <label for="text-field-passwword" className="mt-2 mb-1">Password</label>
            <input
                id="text-field-passwword"
                className="form-control"
                value={profile ? profile.password : ""}
                type="password"
                placeholder = "password"
                onChange={(e) => setProfile({...profile, password: e.target.value})}
            />
            <label for="text-fields-firstName" className="mt-2 mb-1">Email</label>
            <input
                id = "text-fields-firstName"
                placeholder="Email"
                className="form-control"
                value={profile ? profile.firstName : ""}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            />
            <label for="text-fields-lastName" className="mt-2 mb-1">Phone</label>
            <input
                id = "text-fields-lastName"
                placeholder = "Phone"
                className="form-control"
                value={profile ? profile.lastName : ""}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            />
            <button onClick={handleUpdate} className="btn btn-success mt-2 mb-2">Update</button>

            <h2>My Reviews</h2>
            <div className="list-group bg-info">

              <ul className="list-group">
              {
                    userReviews && userReviews.map((review) =>
                    <li className="list-group-item">
                      <button onClick={()=>handledelete(review._id)} className="btn btn-danger float-end">delete</button>
                        <Link to={`/details/${review.idMeal}`} className="list-group-item w-75">
                            {review.review}
                        </Link>

                    </li>

                    )
                }
              </ul>
            </div>

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
        <h2>Bookmarks</h2>

            <div className="list-group">
                {
                  albumsIlike.map((album) =>
                    <Link to={`/details/${album.albumId}`} className = "list-group-item">
                        {album.name}
                    </Link>
                    )
                }
            </div>

        </div>
    )
}

export default Profile