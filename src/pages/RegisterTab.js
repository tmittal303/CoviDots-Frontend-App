import "../css/App.css";
import {Link} from "react-router-dom";
import { useState, useContext } from 'react';
import coviDotsContext from '../context/coviDotsContext';

const RegisterTab = () => {
    const refreshPage = ()=>{
        window.location.reload();
     }
     const { setHeaderButtonText, setHeaderButtonLink, setValue, setRegisterTab , bookingData, setBookingData} = useContext(coviDotsContext);
     setHeaderButtonText("Sign In");
     setHeaderButtonLink("/login");

    const setTabValue = (id) => {
             bookingData.user_id = id;
            setBookingData(bookingData);
            console.log(bookingData);
            setValue(4);
    }
     const openSignInTab = () => {
        setRegisterTab(false);
    }
    //register
    const [user, setUser] = useState({
        first_name: "",
        email_address: "",
        last_name: "",
        password: "",
        cpsw: "",
        date_of_birth: "",
        mobile_number: "",
        terms_and_condition: ""
    })
    const submitForm = (e) => {
        //for submitting a post request to server API with the data that user enters

        e.preventDefault();

        fetch("https://calm-journey-19361.herokuapp.com/register", {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(data.message!=null){
                    alert(data.message);
                }
                else{
                alert("User added successfully");
                setTabValue(data._id);
            }
            })
            .catch(err => console.log(`Error : ${err}`))
    }

    return (
        <>
            <div className="registerSignIn">
                <p>Already have an account? Please <Link onClick={openSignInTab}>sign in</Link> to complete your booking.</p>
            </div>
            <form action="/" method="POST" onSubmit={submitForm} className="registerContainer">
            <label for="first_name">First Name:</label>
                <input type="text" name="first_name" required value={user.first_name} onChange={(event) => {
                    setUser({
                        ...user,
                        first_name: event.target.value
                    })
                }} />

                <label for="email_address">Email:</label>
                <input type="text" placeholder="Enter email" name="email_address" required value={user.email_address} onChange={(event) => {
                    setUser({
                        ...user,
                        email_address: event.target.value
                    })
                }} /><br></br><br></br>

                <label for="last_name">Last Name:</label>
                <input type="text" name="last_name" required value={user.last_name} onChange={(event) => {
                    setUser({
                        ...user,
                        last_name: event.target.value
                    })
                }} />

                <label for="password">Password:</label>
                <input type="password" placeholder="Enter password" name="password" required value={user.password} onChange={(event) => {
                    setUser({
                        ...user,
                        password: event.target.value
                    })
                }} /><br></br><br></br>

                <label for="birthDate">Date of Birth:</label>
                <input type="text" placeholder="yyyy-mm-dd" name="birthDate" required value={user.birthDate} onChange={(event) => {
                    setUser({
                        ...user,
                        birthDate: event.target.value
                    })
                }} />

                <label for="cpsw">Confirm Password:</label>
                <input type="password" placeholder="Confirm password" name="cpsw" required value={user.cpsw} onChange={(event) => {
                    setUser({
                        ...user,
                        cpsw: event.target.value
                    })
                }} /><br></br><br></br>

                <label for="mobile_number">Mobile No:</label>
                <input type="mobile" name="mobile_number" placeholder="10 digit - xxxxxxxxxx" required value={user.mobile_number} onChange={(event) => {
                    setUser({
                        ...user,
                        mobile_number: event.target.value
                    })
                }} /><br></br><br></br>

                <label for="terms_and_condition">Terms and Conditions:</label>
                <input type="checkbox" id="terms_and_condition" name="terms_and_condition" required value={user.terms_and_condition} onChange={(event) => {
                    setUser({
                        ...user,
                        terms_and_condition: true
                    })
                }}></input>
                <label type="terms">I have read and agreed to the <a href="#">terms and conditions.</a></label><br></br>

                <Link to="/"><button type="goback">HOME</button></Link>
                <button onClick={refreshPage} type="cancel">CLEAR</button>
                <button type="submit">SUBMIT</button>
            </form>
        </>
    )

}

export default RegisterTab;