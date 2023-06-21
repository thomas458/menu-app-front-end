import Home from "./home/index"
import Profile from "./users/profile"
import Search from "./search/index"
import Login from "./users/login"
import Meals from "./meals/index"
import Users from "./users/index"
import moviesReducer from "./meals/meals-reducer"
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import { Navigate } from 'react-router-dom';
import mealsReducer from "./meals/meals-reducer";
import {configureStore} from "@reduxjs/toolkit";
import mealdbReducer from "./mealdb/mealdb-reducer";
import {Provider} from "react-redux";
import {likesReducer} from "./likes/likes-reducer";
import usersReducer from "./users/usersReducer";
import Register from "./users/register";
import CurrentUser from "./users/current-user";
import MealdbDetails from "./mealdb/mealdb-details";

const store = configureStore({
    reducer: {
        meals: mealsReducer,
        mealdb: mealdbReducer,
        likes: likesReducer,
        users: usersReducer
    }
})

function App() {
  return (
      <BrowserRouter>
        <div className="container">

            <Provider store ={store}>
                <CurrentUser>
                      <Routes>
                          <Route path= "/"          element={<Navigate to="/home"/>}/>
                          <Route path= "/home/*"    element={<Home/>}/>
                          <Route path= "/login/*"    element={<Login/>}/>
                          <Route path= "/profile/*" element={<Profile/>}/>
                          <Route path= "/search/*" element={<Search/>}/>
                          <Route path= "/meals/*" element={<Meals/>}/>
                          <Route path= "/users/*" element={<Users/>}/>
                          <Route path="/details/:idMeal" element={<MealdbDetails/>}/>
                          <Route path= "/register/*" element={<Register/>}/>
                      </Routes>
                </CurrentUser>
            </Provider>

        </div>
      </BrowserRouter>
  );
}
export default App;