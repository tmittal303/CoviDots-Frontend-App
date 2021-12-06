import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PageNotFound from "../pages/PageNotFound";
import AdminHome from '../admin-pages/Home';
import AddLocation from '../admin-pages/AddLocation';
import AddEmployee from '../admin-pages/AddEmployee';
import UpdateInfo from '../admin-pages/UpdateInfo'
import Home from "./Home";
import NursePortal from '../nurse-pages/NursePortal';
import coviDotsContext from '../context/coviDotsContext';
import Tab from "../pages/Tab"
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserMyAccountPage from "../pages/UserMyAccountPage"
import Test from "../admin-pages/Test"



const App = () => {

  const [headerButtonText, setHeaderButtonText] = useState(["Sign In"]);
  const [headerButtonLink, setHeaderButtonLink] = useState(["/login"]);
  const [value, setValue] = useState(0);
  const [openRegisterTab, setRegisterTab] = useState(false); 
  const [bookingData, setBookingData] = useState({});

  return (
    <Router>
      <Switch>
      <coviDotsContext.Provider value={{ headerButtonText, setHeaderButtonText, headerButtonLink, setHeaderButtonLink, value, setValue, openRegisterTab, setRegisterTab, bookingData, setBookingData}}>
      <Route exact path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
          <Route path="/adminHome">
            <AdminHome />
            <Footer />
          </Route>
          <Route path="/adminAddLocation">
            <AddLocation />
            <Footer />
          </Route>
          <Route path="/adminUpdateVaccineInfo">
            < UpdateInfo />
            <Footer />
          </Route>
          <Route path="/adminAddEmployee">
            <AddEmployee />
            <Footer />
          </Route>
          <Route path="/nurse">
            <Header />
            <NursePortal />
            <Footer />
          </Route>
          <Route path="/pagenotfound">
            <PageNotFound />
          </Route>
          <Route path="/location">
            <Header />
            <Tab />
            <Footer />
          </Route>
          <Route path="/login">
            <Header />
            <LoginPage />
            <Footer />
          </Route>
          <Route path="/register">
            <Header />
            <RegisterPage />
            <Footer />
          </Route>
          <Route path="/usermyaccount">
            <Header />
            <UserMyAccountPage />
            <Footer />
          </Route>
          <Route path="/test">
            <Header />
            <Test />
            <Footer />
          </Route>
          <Route path="/nurse/:id">
            <Header />
            <NursePortal />
            <Footer />
          </Route>
        </coviDotsContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;