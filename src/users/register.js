import {useState} from "react";
import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Navigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState('USER')
    const [validatePassword, setValidatePassword] = useState()
    const [error, setError] = useState(null)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleRegisterBtn = async () => {
        if (password !== validatePassword) {
            setError('Passwords must match')
            return
        }
        if (!username || !password || !validatePassword) {
            setError("Please fill in all fields");
            return;
        }
        setError(null)
        const newUser = {username, password, type}

        try {
            await dispatch(registerThunk(newUser));
            navigate("/profile");
            console.log(username, password, type);
        } catch (e) {
            alert(e);
        }


        // if(currentUser){
        //     return(<Navigate to {...'/profile'}/>)
        // }

    }
    return (
        <>
            <Nav/>
            <h1>Create an account</h1>
            {
                error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Enter your username"
                   className="form-control mb-2"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password"
                   className="form-control mb-2"
                value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="password2">Confirm password</label>
            <input id="password2" type="password" placeholder="Confirm your password"
                   className="form-control mb-2"
                value={validatePassword}
                   onChange={(e) => setValidatePassword(e.target.value)}/>
            <label htmlFor="role">Choose your role</label>
            <select id="role" className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="USER">USER</option>
                <option value="PREMIUM">PREMIUM</option>
            </select>

            <button
                onClick={handleRegisterBtn}
                className="btn btn-outline-success w-100 mt-3">
                Register
            </button>
        </>
    )
}

export default Register