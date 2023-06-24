import Nav from "../nav";
import {useEffect, useState} from "react";
import * as service from './users-service'
import {useDispatch, useSelector} from "react-redux";
import {deleteUserThunk, findAllUsersThunk} from "./users-thunk";

const UserList = () => {
    //const [users, setUsers] = useState([])
    const {users} = useSelector((state) => state.users)
    // const findAllUsers = async () => {
    //     const users = await service.findAllUsers()
    //     setUsers(users)
    // }
    const dispatch = useDispatch()
    useEffect(() => {
        //findAllUsers()
        dispatch(findAllUsersThunk())
    }, [])
    const deleteUserHandler = (id) => {
        dispatch(deleteUserThunk(id));
    }
    return (
        <>
            <Nav />
            <h1>Users {users.length}</h1>
            <ul className="list-group">
                {users.map((user) => (
                    <li className="list-group-item" key={user._id}>
                        {user.username}
                        <button
                            className="btn btn-danger btn-sm ms-2 float-end"
                            onClick={() => deleteUserHandler(user._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default UserList