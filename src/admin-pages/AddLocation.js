import React from 'react'
import "./form.css"
import Navbar from './Navbar';
import { useState } from "react";
import TimeField from 'react-simple-timefield';
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format, parseISO } from 'date-fns'


const AddLocation = () => {
  const [value, onChange] = useState('10:00');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location,setLocation] = useState({
    
    address_line: "",
    city: "",
    province: "",
    postalCode: "",
    country : "",
    location_type : "",
    instructions: "",
    start_date: "",
    end_date: "",
    start_time: "2020-11-24T09:59:08.000Z",
    end_time: "2020-11-24T09:59:08.000Z",
    nurse_id: "",

        
        vaccine: {
            vaccine_type: "",
            quantity: "",
            start_date: "2020-11-24T09:59:08.000+00:00",
            end_date: "2020-11-24T09:59:08.000+00:00"
        }
  })
    let history = useHistory();

    function handleClick() {
      history.push("/adminHome");

      
    }

    const submitForm=(e)=>{

      e.preventDefault();

      fetch("https://calm-journey-19361.herokuapp.com/addNewLocation",{
        method: "POST",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin' ,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
      }).then(res=>res.json())
      .then(data=>{
        console.log(location)
        console.log(data)
          alert(`the location with postal code ${data.postalCode} added successfully`);
      }).catch(err=>{
          console.log(`ERROR : ${err}`);
      })
  }
    return (
        <>
        <div className='addLocationForm'>
            <Navbar/>
         
          <form className="form-element" action="/" method="POST" onSubmit={submitForm}>
            <label for="postalcode" >Please enter the postal code of thr new location for Vaccination: </label>
            <input type="text" name="postalCode" placeholder="Postal Code" pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" className="form-text" value={location.postalCode} onChange={(event)=>{
                setLocation({
                    ...location,
                    postalCode:event.target.value,
                    location_id:event.target.value
                })
            }}/><br/><br/>

            <label for="address" >Enter the Address Line: </label>
            <input type="text" name="address_line" placeholder="address Line" className="form-text1" value={location.address_line} onChange={(event)=>{
                setLocation({
                    ...location,
                    address_line:event.target.value
                })
            }}/><br/><br/>
            <label for="address" >Enter the City: </label>
            <input type="text" name="city" placeholder="City" className="form-text2" value={location.city} onChange={(event)=>{
                setLocation({
                    ...location,
                    city:event.target.value
                })
            }}/><br/><br/>

            <label for="address" >Enter the Province: </label>
            <input type="text" name="province" placeholder="Province" className="form-text3" value={location.province} onChange={(event)=>{
                setLocation({
                    ...location,
                    province:event.target.value
                })
            }}/><br/><br/>

            <label for="address" >Enter the Country: </label>
            <input type="text" name="country" placeholder="Country" className="form-text4" value={location.country} onChange={(event)=>{
                setLocation({
                    ...location,
                    country:event.target.value
                })
            }}/><br/><br/>
            <label for="address" >Enter the Location Type: </label>
            <input type="text" name="location_type" placeholder="City" className="form-text5" value={location.location_type} onChange={(event)=>{
                setLocation({
                    ...location,
                    location_type:event.target.value
                })
            }}/><br/><br/>
         

            <label className="form-label">Any detailed description for the people who comes to this location: </label>
            <input type="text" name="instruction" className="form-text6" placeholder="Description" value={location.instructions} onChange={(event)=>{
                setLocation({
                    ...location,
                    instructions:event.target.value
                })
            }}/><br/><br/><br/>

<label for="address" >Enter the nurse's Id available at that location: </label>
            <input type="text" name="nurse_id" placeholder="nurseID" className="form-text7" value={location.nurse_id} onChange={(event)=>{
                setLocation({
                    ...location,
                    nurse_id:event.target.value
                })
              }}/><br/><br/><br/>

            <label for="address" >Enter the vaccine available at that location: </label>
            <input type="text" name="vaccine_type" placeholder="vaccine Type" className="form-text8" value={location.vaccine.vaccine_type} onChange={(event)=>{
                setLocation({
                    ...location,
                    vaccine:{
                        ...location.vaccine, 
                        vaccine_type:event.target.value
                    }
                })
            }}/><br/><br/>

            <label for="address" >Enter the Quantity of vaccine available at that location: </label>
            <input type="text" name="quantity" placeholder="quantity" className="form-text9" value={location.vaccine.quantity} onChange={(event)=>{
                setLocation({
                    ...location,
                    vaccine:{
                        ...location.vaccine, 
                      quantity:event.target.value
                  }
                })
            }}/><br/><br/>

            <label className="form-label">Select the start Date: </label>
             <DatePicker className="selectDateform" name="start_date"  selected={startDate} onChange={(date) => setLocation({
               ...location,
               start_date:date.toISOString()
             })} /><br/><br/>

             <label className="form-label">Select the end Date: </label>
             <DatePicker className="selectDateform" name="end_date"  selected={endDate} onChange={(date) => setLocation({
               ...location,
               end_date:date.toISOString()
             })} /><br/><br/>

            {/* <label className="form-label">Timings the location will be operating: </label>
             <label className="timingFrom">From: </label>
                <TimeField value={location.start_time}  className="fromTime" onChange={(event)=>{
                setLocation({
                    ...location,
                    start_time:event.target.value
                })
            }} colon=":"  />
             <label className="form-label">To: </label>
                <TimeField value={location.end_time} onChange={(event)=>{
                setLocation({
                    ...location,
                    end_time:event.target.value
                })
            }} colon=":" /><br/><br/> */}

            <button type="submit" >Add Location</button>
            
          </form>
        </div>
        </>
    )
}

export default AddLocation
