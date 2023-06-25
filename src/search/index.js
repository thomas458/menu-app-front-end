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

  const targetProperty = "albumId";
// 使用`some()`方法进行判断
  const isMemberExists =(str) => albumsIlike.some(function (member) {
    return member[targetProperty] === str;
  });
  useEffect(() => {
    fetchMyLikes();
    if (searchTerm) {
      setQuery(searchTerm);
      dispatch(findMealBySearchTermThunk(query))
      setQuery("");
    }
  }, [searchTerm]);
    const{meals, loading} = useSelector((state) => state.mealdb)
    const dispatch = useDispatch()

    return(
        <div>
            <Nav/>
            <h1>Mealdb Search</h1>

            <button className="btn btn-primary w-25 float-end" onClick={() => {
              navigate(`/search/${query}`)
                //dispatch(findMealBySearchTermThunk(query))
            }}>Search</button>
          <input className="form-control w-75 mb-2"
                 onChange={(e) => {
                   setQuery(e.target.value)
                 }}
                 value = {query}/>
            <ul className="list-group">
                {
                    meals && meals.map((meal) =>
                        <li key={meal.idMeal} className="list-group-item">
                          <img src={meal.strMealThumb} style={{ width: '80px', height: '60px' }} />

                            <Link to={`/details/${meal.idMeal}`} className="m-2">
                                {meal.strMeal}
                            </Link>

                          {isMemberExists(meal.idMeal)?<BsFillBookmarkFill className="text-danger"/>:""}

                          {/*<button className="btn btn-info float-end" onClick={() =>{*/}
                          {/*  dispatch(userLikesMealThunk({*/}
                          {/*    uid: 111, mid: meal.idMeal*/}
                          {/*  }))*/}
                          {/*}}>*/}
                          {/*  Like*/}
                          {/*</button>*/}

                        </li>
                    )
                }
            </ul>
          {/*<pre>{JSON.stringify(albumsIlike, null, 2)}</pre>*/}
        </div>
    )
}

export default Search