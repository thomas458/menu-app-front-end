import {useState} from "react";
import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, registerThunk} from "./users-thunk";
import {useNavigate} from "react-router";

const Login = () => {
    const[username, setUsername] = useState('alice')
    const[password, setPassword] = useState('alice123')
    const[validatePassword, setValidatePassword] = useState('alice123')
    const [error, setError] = useState(null)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginBtn = async () => {
        setError(null)
        const loginUser = {username, password}
        await dispatch(loginThunk(loginUser))
        navigate('/profile')


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

            <input
                className="form-control mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            <input
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