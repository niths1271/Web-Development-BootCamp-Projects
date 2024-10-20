import {useRef} from "react";
import "./register.css";
import axios from "axios";
import {useHistory} from "react-router";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const SubmitHandler=async(event)=>{
        event.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password
                .current
                .setCustomValidity("Passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            console.log(user);
            try{
           const res=await axios.post("http://localhost:8000/api/auth/register",user);
           console.log(res);
           history.push("/login")
            }catch(err){
               console.log(err.response.data);
            }
        }
    }

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
                    <input placeholder="Username" className="loginInput" ref={username} required/>
                    <input
                        placeholder="Email"
                        type="email"
                        className="loginInput"
                        ref={email}
                        required/>
                    <input
                        placeholder="Password"
                        type="password"
                        className="loginInput"
                        ref={password}
                        min="6"
                        required/>
                    <input
                        placeholder="Password Again"
                        type="password"
                        className="loginInput"
                        ref={passwordAgain}
                        required/>
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton">Log Into Account
                    </button>
                </form>
            </div>
        </div>
    </div>
)
}