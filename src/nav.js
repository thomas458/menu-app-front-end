import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import {GiFallingLeaf} from "react-icons/gi";

const Nav = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {pathname} = useLocation()
    const parts = pathname.split('/')
    console.log(parts)
    const screens = [
        'home', 'search'
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
    return (
        <nav className="navbar navbar-expand-md navbar-toggler bg-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <GiFallingLeaf />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {screens.map((screen) => (
                            <li className="nav-item" key={screen}>
                                <Link
                                    to={`/${screen}`}
                                    className={`nav-link ${
                                        parts[1] === screen ? "active" : ""
                                    }`}
                                >
                                    <span className="text-capitalize">{screen}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>Hi {currentUser && currentUser.username}</div>
            </div>
        </nav>
    );
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