import React, {useEffect, useState} from "react";
import {profileThunk} from "./users-thunk";
import {useDispatch, useSelector} from "react-redux";

const CurrentUser = ({children}) => {
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProfile = async () => {
            try{
                await dispatch(profileThunk())
            }catch(error){
                console.error(error)
            }
            setIsLoading(false);

        };
        fetchProfile()
    }, [])
    if(isLoading) return null;
    return (children)
}

export default CurrentUser