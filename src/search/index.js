import Nav from "../nav";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findMealBySearchTermThunk} from "../mealdb/mealdb-thunks";
import {userLikesMealThunk} from "../likes/likes-thunks";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as service from "../likes/likes-service";
import {AiFillHeart} from "react-icons/ai";
import {BsFillBookmarkFill} from "react-icons/bs";


function Search(){
  const { searchTerm } = useParams();
    //const [searchTerm, setSearchTerm] = useState('Cake')
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchTerm);
  const [albumsIlike, setAlbumsIlike] = useState([]);
  const fetchMyLikes = async () => {
    const albums = await service.findAlbumsILike();
    setAlbumsIlike(albums);
  };
  const{meals, loading} = useSelector((state) => state.mealdb)
  const dispatch = useDispatch()

  const targetProperty = "albumId";

  const isMemberExists =(str) => albumsIlike.some(function (member) {
    return member[targetProperty] === str;
  });
  useEffect(() => {
    fetchMyLikes();
    const getfood = async () => {
      try {
        if (searchTerm) {
          setQuery(searchTerm);
          await dispatch(findMealBySearchTermThunk(query));
          setQuery("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getfood();
  }, [searchTerm]);


  useEffect(() => {
    if (!loading &&(!meals||meals.length === 0)) {
      navigate("/search");
    }
  }, [meals, loading]);



    return(
        <div>
            <Nav/>

            <h1>Mealdb Search</h1>

            <button className="btn btn-primary w-25 float-end" onClick={() => {
              navigate(`/search/${query}`)
                //dispatch(findMealBySearchTermThunk(query))
            }}>Search</button>
          <input className="form-control w-75 mb-2"
                 placeholder="Enter food name"
                 onChange={(e) => {
                   setQuery(e.target.value)
                 }}
                 value = {query}/>
            <ul className="list-group">
                {
                    searchTerm&&meals && meals.map((meal) =>
                        <Link to={`/details/${meal.idMeal}`} style={{ textDecoration: 'none' }} className="no-underline">
                        <li key={meal.idMeal} className="list-group-item">

                          <img src={meal.strMealThumb} style={{ width: '80px', height: '60px' }} />

                                <span className="ms-2"> {meal.strMeal}</span>

                          {isMemberExists(meal.idMeal)?<BsFillBookmarkFill className="text-danger ms-1"/>:""}

                        </li>
                        </Link>

                    )
                }
            </ul>
          {/*<pre>{JSON.stringify(albumsIlike, null, 2)}</pre>*/}
        </div>
    )
}

export default Search