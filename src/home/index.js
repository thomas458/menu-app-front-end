import {Link} from "react-router-dom";
import Nav from "../nav";
import {useEffect} from "react";
import {getRandomMealsThunk} from "../mealdb/mealdb-thunks";
import {useDispatch, useSelector} from "react-redux";
import {userLikesMealThunk} from "../likes/likes-thunks";

function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

function Home(){
    const{randomMeals, loading} = useSelector((state) => state.mealdb)

    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getRandomMealsThunk(getRandomLetter()))
        console.log("useEffect")
        // if(randomMeals === null || randomMeals.length === 0) {
        //     dispatch(getRandomMealsThunk(getRandomLetter()))
        // }
    }, [])
    return(
       <div>
           <Nav/>
           <h1>Home</h1>
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
    )
}
export default Home