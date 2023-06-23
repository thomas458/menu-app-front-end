import {useState} from "react";
import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";

const Register = () => {
    const [username, setUsername] = useState('alice')
    const [password, setPassword] = useState('alice123')
    const [type, setType] = useState('USER')
    const [validatePassword, setValidatePassword] = useState('alice123')
    const [error, setError] = useState(null)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const handleRegisterBtn = () => {
        if (password !== validatePassword) {
            setError('Passwords must match')
            return
        }
        setError(null)
        const newUser = {username, password}
        dispatch(registerThunk(newUser))

        // if(currentUser){
        //     return(<Navigate to {'/profile'}/>)
        // }

    }
    return (
        <>
            <Nav/>
            <h1>Register</h1>
            <h2>Create an account</h2>
            {
                error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }
            <label>Username</label>
            <input
                className="form-control mb-2"
                // value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            <label>Password</label>
            <input
                className="form-control mb-2"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <label>Verify your password</label>
            <input
                className="form-control mb-2"
                // value={validatePassword}
                onChange={(e) => setValidatePassword(e.target.value)}/>
            <label>Choose your role</label>
            <select className="form-select">
                <option selected>User</option>
                <option>Premium Member</option>
                onChange={(e) => setType(e.target.value)}/>
            </select>

            <button
                onClick={handleRegisterBtn}
                className="btn btn-primary w-100 mt-3">
                Register
            </button>
            {
                currentUser &&
                <h2>Welcome {currentUser.username}</h2>
            }
        </>
    )
}

export default Register