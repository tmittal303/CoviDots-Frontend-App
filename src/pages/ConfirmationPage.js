import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';

import coviDotsContext from '../context/coviDotsContext';

const ConfirmationPage = () => {
    const { setHeaderButtonLink, bookingData, setHeaderButtonText } = useContext(coviDotsContext);
    setHeaderButtonText("Sign Out");
    const [user, setUser] = useState({});
    const [location, setLocation] = useState({});
    const [success, setSuccess] = useState(false);
    setHeaderButtonLink("/")
    useEffect(() => {
        fetch("https://calm-journey-19361.herokuapp.com/users/" + bookingData.user_id).then(response => {
            return response.json();
        }).then((data) => {
            setUser(data);
        }).catch((err) => {
            console.log(err);
        })
        fetch("https://calm-journey-19361.herokuapp.com/locations/" + bookingData.location_id).then(response => {
            return response.json();
        }).then((data) => {
            setLocation(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleConfirm = () => {
        fetch("https://calm-journey-19361.herokuapp.com/bookings",
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            }).then(response => {
                return response.json();
            }).then((data) => {
                setSuccess(true);
            }).catch((err) => {
                console.log(err);
            })

    };


    return (
        <div class="d-flex justify-content-center">
            <Card className="text-center" border="success" style={{ width: '30rem' }}>
                <Card.Header as="h5">Vaccination Booking Details</Card.Header>
                <Card.Body>
                    <Card.Title>User Details</Card.Title>
                    <Card.Text> Name : {user.first_name + " " + user.last_name}</Card.Text>
                    <Card.Text> Mobile : {user.mobile_number}</Card.Text>
                    <Card.Text> Email : {user.email}</Card.Text>
                    <Card.Title>Location Details</Card.Title>
                    <Card.Text> Location : {location.address_line + " " + location.city + " " + location.postalCode}</Card.Text>
                    <Card.Title>Date-time Details</Card.Title>
                    <Card.Text> Date : {bookingData.booking_date}</Card.Text>
                    <Card.Text> Date : {bookingData.booking_time}</Card.Text>
                    {(() => {
                        if (success) {
                            return <><Button style={{ width: '10rem' }} variant="success" disabled>Your Bokking is Confirmed</Button></>
                        } else {
                            return <Button style={{ width: '10rem' }} variant="success" onClick={handleConfirm}>Confirm</Button>
                        }
                    })()}
                </Card.Body>
            </Card>
        </div>
    )
}
export default ConfirmationPage
