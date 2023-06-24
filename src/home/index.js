import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../nav";
import { getRandomMealsThunk } from "../mealdb/mealdb-thunks";
import ReviewList from "../reviews/review-list";
import RecentReviews from "../reviews/recent-reviews";

function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

function Home() {
    const { randomMeals, loading } = useSelector((state) => state.mealdb);
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRandomMealsThunk(getRandomLetter()));
    }, []);

    return (
        <div className="container">
            <Nav />
            <header className="text-center my-5">
                <h1 className="display-4">Welcome to Mealicious</h1>
                <p className="lead">Discover delicious meals from around the world</p>
            </header>
            <div className="row">
                <div className="col-lg-8">
                    <h2 className="mb-4">Featured Meals</h2>
                    <div className="row">
                        {randomMeals &&
                            randomMeals.map((meal) => (
                                <div key={meal.idMeal} className="col-md-6 mb-4">
                                    <div className="card h-100">
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="card-img-top"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{meal.strMeal}</h5>
                                            <Link
                                                to={`/details/${meal.idMeal}`}
                                                className="btn btn-primary"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="col-lg-4">
                    <h2 className="mb-4">Reviews</h2>
                    {currentUser ? <ReviewList /> : <RecentReviews />}
                </div>
            </div>
        </div>
    );
}

export default Home;
