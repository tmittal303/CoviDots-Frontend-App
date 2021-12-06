import "../css/App.css";
import { Link } from "react-router-dom";
import { useState, useContext } from 'react';
import coviDotsContext from '../context/coviDotsContext';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const refreshPage = () => {
        window.location.reload();
    }
    const { setHeaderButtonText, setHeaderButtonLink } = useContext(coviDotsContext);
    setHeaderButtonText("Sign up");
    setHeaderButtonLink("/register");
    const history = useHistory();
    //login
    const [login, setLogin] = useState({
        email_address: "",
        password: ""
    })

    const loginForm = (e) => {
        //for submitting a post request to server API with the data that user enters

        e.preventDefault();

        fetch("https://calm-journey-19361.herokuapp.com/login", {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.userRole == "admin") {
                    history.push({
                        pathname: '/adminHome',
                        // state: { emailEntered: login.email }
                    })
                }
                else if(data.userRole == "nurse") {
                    history.push({
                        pathname: '/nurse',
                        // state: { emailEntered: login.email }
                    })
                }
                else if(data.userRole == "user") {
                    history.push({
                        pathname: '/usermyaccount',
                        state: { emailEntered: login.email_address }
                    })
                }
                else {
                    alert(data.message);
                }
            })
            .catch(err => console.log(`Error : ${err}`))
    }

    return (
        <>
            <div className="loginTitle">
                <p>Book Appointment</p>
            </div>
            <div className="loginCreateAccount">
                <p>Don't have an account yet? Please <a href="/register">sign up</a> to complete your booking.</p>
            </div>
            <form className="loginContainer" method="POST" onSubmit={loginForm} action="/">
                <label for="email_address">Email:</label>
                <input type="text" placeholder="Enter Email" name="email_address" value={login.email_address} required  onChange={(event) => {
                            setLogin({
                                ...login,
                                email_address: event.target.value
                            })
                        }} /><br/><br/>

                <label for="password">Password:</label>
                <input type="password" placeholder="Enter Password" value={login.password} name="password" required onChange={(event) => {
                            setLogin({
                                ...login,
                                password: event.target.value
                            })
                        }} /><br></br>
                <button type="submit">LOGIN</button><br></br>
                <Link to="/"><button type="goback">HOME</button></Link>
                <button type="cancel" onClick={refreshPage}>CLEAR</button>
            </form>
        </>
    )

}

export default LoginPage;