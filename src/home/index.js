import {Link} from "react-router-dom";
import Nav from "../nav";
import {useEffect} from "react";
import {getRandomMealsThunk} from "../mealdb/mealdb-thunks";
import {Provider, useDispatch, useSelector} from "react-redux";
import {userLikesMealThunk} from "../likes/likes-thunks";
import ReviewList from "../reviews/review-list";
import MealList from "./meal-list";

function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

function Home() {
    const {randomMeals, loading} = useSelector((state) => state.mealdb)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRandomMealsThunk(getRandomLetter()))
        console.log("useEffect")
        // if(randomMeals === null || randomMeals.length === 0) {
        //     dispatch(getRandomMealsThunk(getRandomLetter()))
        // }
    }, [])

    return (
        <div className="row">
            <Nav/>
            <h1>Home</h1>
            <div className="col-4">
                <ul className="list-group">
                    {
                        randomMeals && randomMeals.map((meal) =>
                            <li key={meal.idMeal} className="list-group-item">
                                <Link to={`/details/${meal.idMeal}`}>
                                    {meal.strMeal}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="col-4">
                <pre>Hello {currentUser && currentUser.username}</pre>
                {
                    currentUser && (<ReviewList/>)
                }
            </div>
            <div className="col-4">
                {
                    currentUser && currentUser.type === 'PREMIUM' && (<MealList/>)
                }
            </div>
        </div>);
};


export default Home