import "../css/App.css";
import { useState, useContext, useEffect } from 'react';
import coviDotsContext from '../context/coviDotsContext';
import { useLocation } from "react-router-dom";

const UserMyAccountPage = () => {
    const { setHeaderButtonText, setHeaderButtonLink } = useContext(coviDotsContext);

    const [user, setUser] = useState([]);
    const [userUpcomingBooking, setUpcomingUserBooking] = useState([]);
    const [userUpcomingLocation, setUpcomingUserLocation] = useState([]);
    const [userVaccinatedBooking, setVaccinatedUserBooking] = useState([]);
    const [userVaccinatedLocation, setVaccinatedUserLocation] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch("https://calm-journey-19361.herokuapp.com/userbyemail/" + location.state.emailEntered)
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
            .catch(err => console.log(`Error ${err}`));
        fetch("https://calm-journey-19361.herokuapp.com/userupcomingbookingbyid/" + location.state.emailEntered)
            .then(res => res.json())
            .then(data => {
                setUpcomingUserBooking(data);
            })
            .catch(err => console.log(`Error ${err}`));
        fetch("https://calm-journey-19361.herokuapp.com/userupcomingbookinglocation/" + location.state.emailEntered)
            .then(res => res.json())
            .then(data => {
                setUpcomingUserLocation(data);
            })
            .catch(err => console.log(`Error ${err}`));
        fetch("https://calm-journey-19361.herokuapp.com/uservaccinatedbookingbyid/" + location.state.emailEntered)
            .then(res => res.json())
            .then(data => {
                setVaccinatedUserBooking(data);
            })
            .catch(err => console.log(`Error ${err}`));
        fetch("https://calm-journey-19361.herokuapp.com/uservaccinatedbookinglocation/" + location.state.emailEntered)
            .then(res => res.json())
            .then(data => {
                setVaccinatedUserLocation(data);
            })
            .catch(err => console.log(`Error ${err}`));
    }, [])



    setHeaderButtonText("Sign Out");
    setHeaderButtonLink("/")
    return (
        <>
            <div className="userMyAccount">
                <p>MY ACCOUNT</p>
            </div>
            <div className="userMyAccountContainer">
                <div className="personalInfo">
                    <p>Personal Information</p>
                    <div className="border">
                        <label for="firstname">First Name:</label>
                        <input type="text" name="firstname" value={user.first_name} disabled="true" />

                        <label for="mobile">Mobile No:</label>
                        <input type="tel" name="mobile" value={user.mobile_number} disabled="true" /><br></br><br></br>

                        <label for="lastname">Last Name:</label>
                        <input type="text" name="lastname" value={user.last_name} disabled="true" />

                        <label for="email">Email Address:</label>
                        <input type="email" name="email" value={user.email_address} disabled="true" /><br></br><br></br>

                        <label for="birthdate">Date of Birth:</label>
                        <input type="text" name="birthdate" value={user.date_of_birth} disabled="true" />
                    </div>
                </div>
                <div className="upcomingBookingDetails">
                    <p>Upcoming Booking Details</p>
                    <div className="border">
                        <label for="location">Location:</label>
                        <textarea name="location" value={userUpcomingLocation.address_line
                            + ", " + userUpcomingLocation.city + ", " + userUpcomingLocation.province
                            + ", " + userUpcomingLocation.country + ", " + userUpcomingLocation.postalCode} disabled="true" />

                        <label for="notes">Notes:</label>
                        <textarea name="notes" value={userUpcomingLocation.instructions} disabled="true" /><br></br><br></br>

                        <label for="dateandtime">Appointment Date & time:</label>
                        <input type="text" name="dateandtime" value={userUpcomingBooking.booking_date} disabled="true" />
                        <button type="cancelbooking">CANCEL BOOKING</button>
                    </div>
                </div>
                <div className="doseTaken">
                    <p>Dose Taken</p>
                    <div className="border">
                        <label for="location">Location:</label>
                        <textarea name="location" value={userVaccinatedLocation.address_line
                            + ", " + userVaccinatedLocation.city + ", " + userVaccinatedLocation.province
                            + ", " + userVaccinatedLocation.country + ", " + userVaccinatedLocation.postalCode} disabled="true" />

                        <label for="notes">Vaccine Name:</label>
                        <input type="text" value={userVaccinatedBooking.vaccine_type} disabled="true" /><br></br><br></br>

                        <label for="dateandtime">Vaccine Date:</label>
                        <input type="text" name="dateandtime" value={userVaccinatedBooking.booking_date} disabled="true" />

                        <label for="dateandtime">Status:</label>
                        <input type="text" name="dateandtime" value={userVaccinatedBooking.status} disabled="true" />
                    </div>
                </div>
            </div>
        </>
    )

}

export default UserMyAccountPage;