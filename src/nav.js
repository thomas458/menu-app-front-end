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
        if(currentUser.type === "PREMIUM"||currentUser.type === "ADMIN"){
            screens.push('request')
        }
    }else{
        screens.push('login')
        screens.push('register')
    }
    return (
        <nav className="navbar navbar-expand-md navbar-toggler bg-light mt-4 mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <GiFallingLeaf />
                </Link>
                <div className="navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {screens.map((screen) => (
                            <li className="nav-item " key={screen}>
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
                <div className="navbar-text">Hi {currentUser && currentUser.username}</div>
            </div>
        </nav>
    );
}

export default Nav