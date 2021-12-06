import React from 'react';
import "../css/App.css";
import { CardGroup, Card, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../images/vaccine-homepage.jpg';
import coviDotsContext from '../context/coviDotsContext';

const Home = () => {
    const { setHeaderButtonText, setHeaderButtonLink } = useContext(coviDotsContext);
    setHeaderButtonText("Sign In");
  setHeaderButtonLink("/login");
    return (
        <div>
            <Card className="text-center">
                <Card.Img variant="top" src={homeImage} />
                <Card.ImgOverlay>
                    <Card.Body>
                        <Card.Title>COVID-19</Card.Title>
                        <Card.Text>
                            Toronto is in Step Three of the Roadmap to Reopen. Get health updates and information about COVID-19 vaccines at <a href="https://www.toronto.ca/home/covid-19">toronto.ca/covid19</a>.
                        </Card.Text>
                        <Card.Text>
                            Now book your covid vaccine appoinments online!
                            <Card.Text><br></br>
                               <a href="/location">
                                <Button variant="success" className="booknow-button !important" size="lg">Book Now</Button>
                                </a>
                            </Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
            <br></br>
            <br></br>
            <h2 className="text-center">COVID-19 Updates</h2>
            <br></br>
            <br></br>
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src="https://www.toronto.ca/wp-content/uploads/2020/08/8df6-whats-new-masks3-350x250.png" />
                    <Card.Body>
                        <Card.Title>COVID-19 Information</Card.Title>
                        <Card.Text>
                            Find out how to protect yourself and learn about the current situation in Toronto.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.toronto.ca/wp-content/uploads/2021/03/94fd-whatsnew-covidvaccine.jpg" />
                    <Card.Body>
                        <Card.Title>COVID-19 Vaccines</Card.Title>
                        <Card.Text>
                            Protect yourself, loved ones, and the community by getting vaccinated when it's your turn.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.toronto.ca/wp-content/uploads/2019/05/95c9-311-csr-whats-new-banner.jpg" />
                    <Card.Body>
                        <Card.Title>Make the Right Call </Card.Title>
                        <Card.Text>
                            ThIt's important to make the right call at the right time, to get the service you need.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Home
