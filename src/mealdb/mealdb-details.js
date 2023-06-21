import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findMealByMealIdThunk} from "./mealdb-thunks";
import {useEffect} from "react";
import Nav from "../nav";

const MealdbDetails = () => {
    const {idMeal} = useParams()
    const {details} = useSelector((state) => state.mealdb)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMealByMealIdThunk(idMeal))
    }, [])
    var title = "Meals"
    if(details && details.meals){
        title = details.meals[0].strMeal
    }
    var meals = ""
    if(details && details.meals){
        meals = details.meals[0]
    }
    //console.log(details.meals[0].strMealThumb)

    return(
        <>
            <Nav/>
            <h1>{title}</h1>
            <h2>{currentUser._id}</h2>
            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        <li className="list-group-item">{meals.strCategory}</li>
                        <li className="list-group-item">{meals.strArea}</li>
                        <li className="list-group-item">{meals.strInstructions}</li>
                    </ul>
                </div>
                <div className="col">
                    <img src = {meals.strMealThumb}/>
                </div>
            </div>
            <pre>
                {JSON.stringify(details, null, 2)}
            </pre>
        </>
    )
}

export default MealdbDetails