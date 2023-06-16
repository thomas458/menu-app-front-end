import Home from "./home/index"
import Profile from "./profile/index"
import Search from "./search/index"
import Details from "./details/index"
import Login from "./login/index"
import Meals from "./meals/index"
import moviesReducer from "./meals/meals-reducer"
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import { Navigate } from 'react-router-dom';
import mealsReducer from "./meals/meals-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

const store = configureStore({
    reducer: {
        meals: mealsReducer
    }
})

function App() {
  return (
      <BrowserRouter>
        <div className="container">
            <Provider store ={store}>
              <Routes>
                  <Route path= "/"          element={<Navigate to="/home"/>}/>
                  <Route path= "/home/*"    element={<Home/>}/>
                  <Route path= "/details/*"    element={<Details/>}/>
                  <Route path= "/login/*"    element={<Login/>}/>
                  <Route path= "/profile/*" element={<Profile/>}/>
                  <Route path= "/search/*" element={<Search/>}/>
                  <Route path= "/meals/*" element={<Meals/>}/>
              </Routes>
            </Provider>
        </div>
      </BrowserRouter>
  );
}
export default App;