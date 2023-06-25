import {useState} from "react";
import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Navigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('alice')
    const [password, setPassword] = useState('alice123')
    const [type, setType] = useState('USER')
    const [validatePassword, setValidatePassword] = useState('alice123')
    const [error, setError] = useState(null)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleRegisterBtn = async () => {
        if (password !== validatePassword) {
            setError('Passwords must match')
            return
        }
        setError(null)
        const newUser = {username, password, type}

        try {
            await dispatch(registerThunk(newUser));
            navigate("/profile");
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
            <label for="username">Username</label>
            <input id="username" placeholder="Enter your username"
                   className="form-control mb-2"
                // value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password"
                   className="form-control mb-2"
                // value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            <label for="password2">Confirm password</label>
            <input id="password2" type="password" placeholder="Confirm your password"
                   className="form-control mb-2"
                // value={validatePassword}
                   onChange={(e) => setValidatePassword(e.target.value)}/>
            <label>Choose your role</label>
            <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="USER">USER</option>
                <option value="PREMIUM">PREMIUM</option>
            </select>

            <button
                onClick={handleRegisterBtn}
                className="btn btn-primary w-100 mt-3">
                Register
            </button>
        </>
    )
}

export default Register