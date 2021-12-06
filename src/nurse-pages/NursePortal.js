import React from 'react';
import {
    Card, Table, Button, Modal
} from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import "../css/App.css";
import coviDotsContext from '../context/coviDotsContext';

function NursePortal() {
    const [show, setShow] = useState(false);
    const [itemId, setItemId] = useState("");
    const [bookings, setBookings] = useState([]);
    const { setHeaderButtonText, setHeaderButtonLink } = useContext(coviDotsContext);
    const [remainingShots, setRemainingShots] = useState(2000);
    const [vaccinatedCount, setVaccinatedCount] = useState(200);
    const [pendingAppoinments, setPendingAppoinments] = useState(1800);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        return () => {
            setShow(true);
            setItemId(id);
        }
    }
    setHeaderButtonText("Sign Out");
    setHeaderButtonLink("/");
    useEffect(() => {
        fetch("https://calm-journey-19361.herokuapp.com/userbookings").then(response => {
            return response.json();
        }).then((data) => {
            setBookings(data);
        }).catch((err) => {
            console.log(err);
        })
        fetch("https://calm-journey-19361.herokuapp.com/nurse/metrics").then(response => {
            return response.json();
        }).then((data) => {
            setVaccinatedCount(data.vaccinatedCount);
            setRemainingShots(data.totalCount);
            setPendingAppoinments(data.totalCount - data.vaccinatedCount)
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    const updateVaccinated = () => {
        fetch("https://calm-journey-19361.herokuapp.com/userbooking/" + itemId,
            {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "status": "COMPLETED" })
            }).then(response => {
                return response.json();
            }).then((data) => {
                handleClose();
            }).catch((err) => {
                console.log(err);
            })
        fetch("https://calm-journey-19361.herokuapp.com/nurse/metrics").then(response => {
            return response.json();
        }).then((data) => {
            setVaccinatedCount(data.vaccinatedCount);
            setRemainingShots(data.totalCount);
            setPendingAppoinments(data.totalCount - data.vaccinatedCount)
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div class="row">
            <div className="text-center col-md-3">
                <Card bg="Secondary" style={{ width: '18rem' }}>
                    <Card.Header>Remaining Shots</Card.Header>
                    <Card.Body>
                        <Card.Title>{remainingShots}</Card.Title>
                    </Card.Body>
                </Card>
                <br />

                <Card bg="Secondary" style={{ width: '18rem' }}>
                    <Card.Header>Shots Given Today</Card.Header>
                    <Card.Body>
                        <Card.Title>{vaccinatedCount}</Card.Title>
                    </Card.Body>
                </Card>
                <br />

                <Card bg="Secondary" style={{ width: '18rem' }}>
                    <Card.Header>Pending Appoinments</Card.Header>
                    <Card.Body>
                        <Card.Title>{pendingAppoinments}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
            </div>

            <div className="col-md-9">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Appoinment</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile Number</th>
                            <th>Email Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((item) => (
                            <tr>
                                <td>{item.booking_date.slice(0, 10) + " @ " + item.booking_time}</td>
                                <td>{item.user.first_name}</td>
                                <td>{item.user.last_name}</td>
                                <td>{item.user.mobile_number}</td>
                                <td>{item.user.email_address}</td>
                                <td>
                                    <Button disabled = {item.status==='COMPLETED'} variant="success" onClick={handleShow(item._id)}  className="booknow-button !important" size="md">Vaccinated</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm vaccination</Modal.Title>
                </Modal.Header>
                <Modal.Body>Have you successfully vaccinated the patient?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={updateVaccinated}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default NursePortal;