import React from 'react';
import "./form.css"
import Navbar from './Navbar';
import  { useState, useContext,useEffect } from 'react';


function Home() {

  const [bookings, setBookings] =useState([]);
  useEffect(()=>{
 fetch("https://calm-journey-19361.herokuapp.com/bookings").then(response => {
          return response.json()
      }).then((json)=>{
        setBookings(json);
      }).catch((err)=>{
          console.log(err);
      })
  },[])

  return (
      <>
    <Navbar/>
    <div className='form-element'>
        
      <h1>Welcome AdminXX,</h1>
      <div className="vaccineDetails">
                        <table>
                            <tr>
                                <th>Bookings made so far</th>
                                <th>Bookings to be done as per Target</th>
                            </tr>
                            <tr>
                                <td>{bookings.length}</td>
                                <td>{10000-bookings.length}</td>
                            </tr>
                            
                        </table>
                    </div>
      
    </div>
    </>
  );
}

export default Home;
