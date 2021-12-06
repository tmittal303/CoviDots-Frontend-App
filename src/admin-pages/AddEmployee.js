import React from 'react'
import "./form.css"
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";
import { useState } from "react";

const AddEmployee = () => {

    let history = useHistory();

    const [employee,setEmployee] = useState({
    
      emp: "",
      user_id: ""
    })

    const submitForm=(e)=>{

      e.preventDefault();

      fetch("https://calm-journey-19361.herokuapp.com/addEmployee",{
        method: "PUT",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin' ,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      }).then(res=>res.json())
      .then(data=>{
        console.log(employee)
        console.log(data)
          alert(`the employee with name ${data.first_name} added as a ${employee.emp}`);
      }).catch(err=>{
          console.log(`ERROR : ${err}`);
      })
  }

    return (
        <div>
            <Navbar/>
            <form className="form-element" action="/" method="PUT" onSubmit={submitForm}>
              
                
       
              <label className="form-label">Name of the employee: </label>
              <input type="text" className="form-text04" placeholder="Name"/><br/><br/>
       
              <label className="form-label">Employee Id: </label>
              <input type="text" className="form-text05" placeholder="Employee Id"  maxlength="6" value={employee.user_id} onChange={(event)=>{
                setEmployee({
                    ...employee,
                    user_id:event.target.value
                })
            }}/><br/><br/>
       
              <label className="form-label">Email Id: </label>
              <input type="email" placeholder="Email" className="form-text06"/><br/><br/>

              <label className="form-label">Type of Employee (admin/nurse): </label>
              <input type="text" placeholder="Type" className="form-text07" value={employee.emp} onChange={(event)=>{
                setEmployee({
                    ...employee,
                    emp:event.target.value
                })
            }}/><br/><br/>
       
              <button type="submit" className="addAdminBtn" >Add Admin/ Nurse</button>
        </form> 
        </div>
    )
}

export default AddEmployee
