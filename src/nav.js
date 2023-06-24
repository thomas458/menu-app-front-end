import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

const Nav = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {pathname} = useLocation()
    const parts = pathname.split('/')
    console.log(parts)
    const screens = [
        'search'
    ]
    if(currentUser) {
        screens.push('profile')
        if(currentUser.type === "ADMIN"){
            screens.push('users')
        }
        if(currentUser.type === "PREMIUM"){
            screens.push('meals')
        }
    }else{
        screens.push('login')
        screens.push('register')
    }
    return(
        <ul className="nav nav-pills">
            <li className="nav-item">
                <Link to="/"
                      className={`nav-link ${parts[1] === ''?'active': ''}`}>
                    Home
                </Link>
            </li>

            {
                screens.map((screen) =>
                    <li className="nav-item">
                        <Link to={`/${screen}`}
                              className={`nav-link ${parts[1] === screen ?'active': ''}`}>
                            <span className="text-capitalize">{screen}</span>
                        </Link>
                    </li>)
            }
        </ul>
    )
}

export default Nav
// function Nav() {
//     const{currentUser} = useSelector((state) => state.currentUser)
//     return (
//         <nav className="nav nav-tabs mb-2">
//             <Link className="nav-link" to="/home">Home</Link>
//             <Link className="nav-link" to="/search">Search</Link>
//             <Link className="nav-link" to="/users">Users</Link>
//             <Link className="nav-link" to="/register">Register</Link>
//             <Link className="nav-link" to="/login">Login</Link>
//             <Link className="nav-link" to="/details">Details</Link>
//             <Link className="nav-link" to="/profile">Profile</Link>
//             <Link className="nav-link" to="/meals">Meals</Link>
//         </nav>
//     );
// }
// export default Nav;