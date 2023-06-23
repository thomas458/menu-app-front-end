import {useNavigate, Navigate} from "react-router";
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const {currentUser, loading} = useSelector((state) => state.users)
    console.log("protected currentUser", currentUser, loading)
    if(loading){
        return null
    }
    if(currentUser) {
        return (children)
    }else{
        return (<Navigate to={'/login'}/>)
    }
}
export default ProtectedRoute
