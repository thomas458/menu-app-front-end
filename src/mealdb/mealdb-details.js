import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findMealByMealIdThunk} from "./mealdb-thunks";
import {useEffect, useState} from "react";
import Nav from "../nav";
import {createReviewThunk, findReviewsByMealThunk} from "../reviews/reviews-thunks";

const MealdbDetails = () => {
    const {idMeal} = useParams()
    const [review, setReview] = useState('')
    const {reviews} = useSelector((state) => state.reviews)
    const {details} = useSelector((state) => state.mealdb)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMealByMealIdThunk(idMeal))
        dispatch(findReviewsByMealThunk(idMeal))
    }, [])
    const handlePostReviewBtn = () => {
        dispatch(createReviewThunk({
            review,
            idMeal
        }))
    }
    var title = "Meals"
    if (details && details.meals) {
        title = details.meals[0].strMeal
    }
    var meals = ""
    if (details && details.meals) {
        meals = details.meals[0]
    }
    //console.log(details.meals[0].strMealThumb)
    console.log("review", reviews)
    return (
        <>
            <Nav/>
            <h1>{title}</h1>
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" src={meals.strMealThumb}/>
                </div>
                <div className="col-8">
                    <ul className="list-group">
                        <li className="list-group-item">{meals.strCategory}</li>
                        <li className="list-group-item">{meals.strArea}</li>
                        <li className="list-group-item">{meals.strInstructions}</li>
                    </ul>
                </div>

                {currentUser && (
                    <div>
                    <textarea
                        onChange={(e) => setReview(e.target.value)}
                        className="form-control mt-3"
                    ></textarea>
                        <button className="btn btn-success" onClick={handlePostReviewBtn}>
                            Post Review
                        </button>
                    </div>
                )}
                <ul className="list-group">
                    {
                        reviews.map((review) => (

                            <li className="list-group-item">
                                {review.review}
                                <Link to={`/profile/${review.author._id}`} className="float-end">
                                    {review.author.username}
                                </Link>

                            </li>
                        ))}
                </ul>
            </div>
            <pre>{JSON.stringify(details, null, 2)}</pre>
        </>
    );
}
export default MealdbDetails