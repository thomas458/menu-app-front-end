import {useNavigate, Navigate} from "react-router";
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    if(currentUser) {
        return (children)
    }else{
        return (<Navigate to={'/login'}/>)
    }
}
export default ProtectedRoute
