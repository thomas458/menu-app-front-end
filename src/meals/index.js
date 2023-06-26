import Nav from "../nav";
import {findAllMealsThunk, createMealsThunk, deleteMealsThunk} from "./meals-thunks";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLikesMealThunk} from "../likes/likes-thunks";
import {profileThunk} from "../users/users-thunk";


const Meals = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {meals} = useSelector((state) => state.meals)
    const [meal, setMeal] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllMealsThunk())
        dispatch(profileThunk())
        }, [])
    console.log(meals)
    return (
        <>
            <Nav/>
            <h1>New Meal Request</h1>
            {/*{*/}
            {/*    currentUser &&*/}
            {/*    <h2>Welcome {currentUser.username}</h2>*/}
            {/*}*/}
            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-primary float-end w-25" onClick={() => {
                        console.log("onClick")
                        dispatch(createMealsThunk(
                            {
                                name: meal.name,
                                usr:currentUser._id
                            }
                        ))
                        setMeal({ name: "" });
                    }}>Create</button>
                    <input className="form-control"
                           style={{ width: '73%' }}
                           placeholder="Enter meal name"
                           onChange={(e) =>
                               setMeal({...meal, name:e.target.value})}
                           value={meal.name}/>
                </li>
                {
                    meals.map((meal) =>
                    {if((currentUser.type==="ADMIN"||currentUser._id===meal.usr))return(<li className="list-group-item" key={meal._id}>

                        {/*<button className="btn btn-success float-end" onClick={()=>{*/}
                        {/*    dispatch(userLikesMealThunk({uid: 111, mid: meal._id}))*/}
                        {/*}}>*/}
                        {/*    Like*/}
                        {/*</button>*/}
                        {/*<button className="btn btn-info float-end">*/}
                        {/*    Dislike*/}
                        {/*</button>*/}

                        <button className="btn btn-danger float-end" onClick={() => {
                            dispatch(deleteMealsThunk(meal._id))
                        }}>

                            Delete
                        </button>
                        {meal.name}
                    </li>)})
                }
            </ul>
        </>
    )
}

export default Meals;