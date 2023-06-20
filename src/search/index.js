import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {findMealBySearchTermThunk} from "../mealdb/mealdb-thunks";
import {userLikesMealThunk} from "../likes/likes-thunks";
import {Link} from "react-router-dom";

function Search(){
    const [searchTerm, setSearchTerm] = useState('Cake')
    const{meals, loading} = useSelector((state) => state.mealdb)
    const dispatch = useDispatch()

    return(
        <div>
            <Nav/>
            <h1>Mealdb Search</h1>
            <input className="form-control w-75 mb-2"
                   onChange={(e) => {
                       setSearchTerm(e.target.value)
                   }}
                   value = {searchTerm}/>
            <button className="btn btn-primary" onClick={() => {
                dispatch(findMealBySearchTermThunk(searchTerm))
            }}>Search</button>
            <ul className="list-group">
                {
                    meals && meals.map((meal) =>
                        <li key={meal.idMeal} className="list-group-item">
                            <button className="btn btn-info" onClick={() =>{
                                dispatch(userLikesMealThunk({
                                    uid: 111, mid: meal.idMeal
                                }))
                            }}>
                                Like
                            </button>
                            <Link to={`/details/${meal.idMeal}`}>
                                {meal.strMeal}
                            </Link>

                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default Search