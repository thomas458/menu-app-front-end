import Nav from "../nav";
import {findAllMealsThunk, createMealsThunk, deleteMealsThunk} from "./meals-thunks";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLikesMealThunk} from "../likes/likes-thunks";
import {profileThunk} from "../users/users-thunk";


const Meals = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {meals} = useSelector((state) => state.meals)
    const [meal, setMeal] = useState({name: 'New Meal'})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllMealsThunk())
        dispatch(profileThunk())
        }, [])
    console.log(meals)
    return (
        <>
            <Nav/>
            <h1>Meals</h1>
            {
                currentUser &&
                <h2>Welcome {currentUser.username}</h2>
            }
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-control w-50"
                        onChange={(e) =>
                    setMeal({...meal, name:e.target.value})}
                        value={meal.name}/>
                    <button className="btn btn-primary" onClick={() => {
                        console.log("onClick")
                        dispatch(createMealsThunk(
                            {
                                name: meal.name
                            }
                        ))
                    }}>Create</button>
                </li>
                {
                    meals.map((meal) =>
                    <li className="list-group-item" key={meal._id}>

                        <button className="btn btn-success float-end" onClick={()=>{
                            dispatch(userLikesMealThunk({uid: 111, mid: meal._id}))
                        }}>
                            Like
                        </button>
                        <button className="btn btn-info float-end">
                            Dislike
                        </button>

                        <button className="btn btn-danger float-end" onClick={() => {
                            dispatch(deleteMealsThunk(meal._id))
                        }}>

                            Delete
                        </button>
                        {meal.name}
                    </li>)
                }
            </ul>
        </>
    )
}

export default Meals;