import "./login.css";
import {CircularProgress} from "@material-ui/core";
import {useRef, useEffect, useContext} from "react";
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const SubmitHandler = (event) => {
        event.preventDefault();
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch);
    }
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social App</h3>
                    <span className="loginDesc">
                        Connect with friends and world around you on Social App
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={SubmitHandler}>
                        <input
                            placeholder="Email"
                            className="loginInput"
                            type="email"
                            ref={email}
                            required/>
                        <input
                            placeholder="Password"
                            className="loginInput"
                            type="password"
                            ref={password}
                            required/>
                        <button className="loginButton">{isFetching
                                ? <CircularProgress color="secondary" size="15px"/>
                                : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">{isFetching
                                ? <CircularProgress color="secondary" size="15px"/>
                                : "Create a New Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
