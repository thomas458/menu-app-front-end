import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {findMealByMealIdThunk} from "./mealdb-thunks";
import {useEffect, useState} from "react";
import Nav from "../nav";
import * as service from "../likes/likes-service";
import {createReviewThunk, findReviewsByMealThunk} from "../reviews/reviews-thunks";

const MealdbDetails = () => {
    const {idMeal} = useParams()
    const [review, setReview] = useState('')
    const {reviews} = useSelector((state) => state.reviews)
    const {details} = useSelector((state) => state.mealdb)
    const {currentUser} = useSelector((state) => state.users)

    const [albumsIlike, setAlbumsIlike] = useState([]);

    const fetchMyLikes = async () => {
        const albums = await service.findAlbumsILike();
        setAlbumsIlike(albums);
    };



    const dispatch = useDispatch()
    useEffect(() => {
        fetchMyLikes();
        dispatch(findMealByMealIdThunk(idMeal))
        dispatch(findReviewsByMealThunk(idMeal))
    }, [])
    const handlePostReviewBtn = () => {
        dispatch(createReviewThunk({
            review,
            idMeal
        }))
    }
    let title = "Meals";
    if (details && details.meals) {
        title = details.meals[0].strMeal
    }
    let meals = "";
    if (details && details.meals) {
        meals = details.meals[0]
    }
    //console.log(details.meals[0].strMealThumb)
    //console.log("review", reviews)

    const getlink=()=> {
        let tmp = "";
        if (details && details.meals) {
            tmp = details.meals[0]
        }
        const cururl = new URL(tmp.strYoutube);
        const searchParams = new URLSearchParams(cururl.search);
        const vid = searchParams.get('v');
        const str="https://www.youtube.com/embed/"+vid;
        console.log(str);
        return "https://www.youtube.com/embed/"+vid;
    }

    const handleLikeAlbum = async () => {
        const album = await service.likeAlbum(idMeal, {
            id: meals.idMeal,
            name: meals.strMeal,
        });
    };



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

                {meals && meals.strYoutube && (
                    <iframe className="mt-3" height="500" src={getlink()} frameBorder="0" allowFullScreen></iframe>
                )}

                <hr />
                {currentUser && (
                    <div>
                        <button onClick={handleLikeAlbum}>Like</button>
                        {/*<button>Dislike</button>*/}
                    </div>
                )}
                <hr />

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
                <ul className="list-group mt-3">
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
            <pre>{JSON.stringify(albumsIlike, null, 2)}</pre>
            {/*<pre>{JSON.stringify(details, null, 2)}</pre>*/}
        </>
    );
}
export default MealdbDetails