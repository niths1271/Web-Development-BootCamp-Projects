import {createContext,useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        "_id" :"60f7d3d883730792a461036d",
        "profilePicture" : "person/1.jpeg",
        "followers" : [ 
            "60f85cd1c6ce79445cc5da62"
        ],
        "followins" : [ 
            "60f85cd1c6ce79445cc5da62", 
            "60f85ce9c6ce79445cc5da64"
        ],
        "isAdmin" : false,
        "username" : "nithin",
        "email" : "nithin@gmail.com",
        "password" : "$2b$10$VOWvTBxpNeDWV6euSWmxtOMxFc7FzBXMYg/N97DNp0clSFyBnmTf2",
        "createdAt" : "2021-07-21T07:59:20.453Z",
        "updatedAt" : "2021-07-21T18:11:18.733Z",
        "__v" : 0,
        "desc" : "God is great",
        "city" : "bengaluru",
        "from" : "london"
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{children}</AuthContext.Provider>
            );
     };