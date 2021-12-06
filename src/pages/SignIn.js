
import React,{useContext, useState} from 'react'
import {Link} from "react-router-dom";
import coviDotsContext from '../context/coviDotsContext';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const refreshPage = () => {
        window.location.reload();
    }
    const { setValue, bookingData, setBookingData , setRegisterTab} = useContext(coviDotsContext);
    const setTabValue = (id) => {
             bookingData.user_id = id;
            setBookingData(bookingData);
            console.log(bookingData);
            setValue(4);
    }
    const openRegisterTab = () => {
        setRegisterTab(true);
    }
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
                    setTabValue(data.id);
                }
                else if(data.userRole == "nurse") {
                    setTabValue(data.id);
                }
                else if(data.userRole == "user") {
                    setTabValue(data.id);
                }
                else {
                    alert(data.message);
                }
            })
            .catch(err => console.log(`Error : ${err}`))
    }
    return (
        <>
        <div className="loginCreateAccount">
            <p>Don't have an account yet? Please <Link onClick={openRegisterTab}>sign up</Link> to complete your booking.</p>
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

export default SignIn
