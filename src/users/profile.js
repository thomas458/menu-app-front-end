import {useDispatch, useSelector} from "react-redux";
import Nav from "../nav";
import {logoutThunk, profileThunk, updateThunk, updateUserThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

const Profile = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [profile, setProfile] = useState(currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        const fetchProfile = async () => {
            try{
                const {payload} = await dispatch(profileThunk());
                setProfile(payload);
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
            <label>Username</label>
            <input
                className="form-control"
                value={profile.username}
                readOnly
            />
            <label>Password</label>
            <input
                className="form-control"
                value={profile.password}
                type="password"
                onChange={(e) => setProfile({...profile, password: e.target.value})}
            />
            <label>First Name</label>
            <input
                className="form-control"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            />
            <label>Last Name</label>
            <input
                className="form-control"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            />
            <button onClick={handleUpdate} className="btn btn-primary">Update</button>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default Profile