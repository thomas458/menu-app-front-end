import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Nav from "../nav";
import {getRandomMealsThunk} from "../mealdb/mealdb-thunks";
import ReviewList from "../reviews/review-list";
import RecentReviews from "../reviews/recent-reviews";

function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

function Home() {
    const {randomMeals, loading} = useSelector((state) => state.mealdb);
    const {currentUser} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRandomMealsThunk(getRandomLetter()));
    }, []);

    return (
        <div className="container mt-2 mb-2">
            <Nav/>
            <header className="banner text-center mt-2">
                <img
                    src="https://headwayhealth.com/wp-content/uploads/2018/07/AdobeStock_145208964.jpeg"
                    alt="Delicious Meals Banner"
                    className="banner-image img-responsive img-fluid"
                />
                <div className="banner-content">
                    <div className="jumbotron">
                        <h1 className="display-4">Welcome!</h1>
                        <p className="lead">Discover delicious meals from around the world</p>
                        <p>Search for your favorite meals, explore new recipes, and share your meal reviews with
                            others.</p>
                        <hr className="my-4"/>
                    </div>
                </div>
            </header>
            <div className="row">
                <div className="col-lg-8">
                    <h2 className="mb-4">Featured Meals</h2>
                    <div className="row">
                        {randomMeals &&
                            randomMeals.map((meal) => (
                                <div key={meal.idMeal} className="col-md-6 mb-4">
                                    <div className="card h-100">
                                        <Link to={`/details/${meal.idMeal}`}
                                              className="link-underline-light text-center text-black">
                                            <img
                                                src={meal.strMealThumb}
                                                alt={meal.strMeal}
                                                className="card-img-top"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{meal.strMeal}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    {currentUser ? <ReviewList/> : <RecentReviews/>}
                </div>
            </div>
        </div>
    );
}

export default Home;
