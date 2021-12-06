import React from 'react'
import "./form.css"
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeField from 'react-simple-timefield';
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";

const UpdateInfo = () => {

    let history = useHistory();

    function handleClick() {
      history.push("/adminHome");
    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location,setLocation] = useState({
    
       location_id:"",
        postalCode: "",
        start_date: "",
        end_date: "",
        nurse_id: "",
            vaccine: {
                vaccine_type: "",
                quantity: ""
            }
      })
    const submitForm=(e)=>{

        e.preventDefault();
  
        fetch("https://calm-journey-19361.herokuapp.com/updateVaccine",{
        method: "PUT",
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
          alert(`the location with postal code ${data.postalCode} updated successfully`);
      }).catch(err=>{
          console.log(`ERROR : ${err}`);
      })
    }
    return (
        <div >
            <Navbar/>
            <form className='form-element' action="/" method="PUT" onSubmit={submitForm}>
      
             <label className="form-label">Enter the location where you need to update the vaccine info: </label>
             <input type="text" name="postalCode" placeholder="Postal Code" pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" className="form-text" value={location.postalCode} onChange={(event)=>{
                setLocation({
                    ...location,
                    location_id:event.target.value,
                    postalCode:event.target.value
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

             <label className="form-label">No of Vaccines available : </label>
             <input type="number" placeholder="Vaccines count" className="form-text01" value={location.vaccine.quantity} onChange={(event)=>{
                setLocation({
                    ...location,
                    vaccine:{
                        ...location.vaccine, 
                      quantity:event.target.value
                  }
                })
            }}/><br/><br/>
       
       <label for="address" >Enter the vaccine available at that location: </label>
            <input type="text" name="vaccine_type" placeholder="vaccine Type" className="form-text02" value={location.vaccine.vaccine_type} onChange={(event)=>{
                setLocation({
                    ...location,
                    vaccine:{
                        ...location.vaccine, 
                        vaccine_type:event.target.value
                    }
                })
            }}/><br/><br/>

             <label className="form-label">No of Nurses assigned on that day for duty: </label>
             <input type="text" name="nurse_id" placeholder="nurseID" className="form-text03" value={location.nurse_id} onChange={(event)=>{
                setLocation({
                    ...location,
                    nurse_id:event.target.value
                })
              }}/><br/><br/><br/>

             {/* <label className="form-label">Timings the location will be operating: </label>
             <label className="timingFrom">From: </label>
                <TimeField value={value}  onChange={(onchange)} colon=":"  />
             <label className="form-label">To: </label>
                <TimeField value={value}  onChange={(onchange)} colon=":" /><br/><br/> */}

            <button type="submit" className="updateVaccineinfoBtn" >Update Info</button>
        </form>
     </div>
    )
}

export default UpdateInfo
