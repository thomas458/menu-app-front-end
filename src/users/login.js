import {useState} from "react";
import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, registerThunk} from "./users-thunk";
import {useNavigate} from "react-router";

const Login = () => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLoginBtn = async () => {
        if (username === "" || password === "") {
            setError("Please fill in all fields");
            return;
        }
        setError(null)
        const loginUser = {username, password}
        try {
            await dispatch(loginThunk(loginUser));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }

    }
    return(
        <>
            <Nav/>
            <h1>Login</h1>
            {
                error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }
            <label for="username">Username</label>
            <input id="username" placeholder="Enter your username"
                className="form-control mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password"
                className="form-control mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <button
                onClick={handleLoginBtn}
                className="btn btn-primary w-100">
                Login
            </button>
        </>
    )
}

export default Login