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
    }, [users])
    const deleteUserHandler = (id) => {
        dispatch(deleteUserThunk(id));
    }
    const usersExceptAdmin = users.filter((user) => user.username !== "admin");

    return (
        <>
            <Nav />
            <h1>Users {usersExceptAdmin.length}</h1>
            <ul className="list-group">
                {usersExceptAdmin.map((user) => (
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