import React, {useState,useContext} from 'react'
import "../css/App.css";
import coviDotsContext from '../context/coviDotsContext';


const SelectTheProvider = () => {
    const [newBooking,setNewBooking] = useState({
    
        booking_date:"",
        booking_time:""
             
       });
    
    
     const submitForm=(e)=>{
    
         e.preventDefault();
    
         fetch("https://calm-journey-19361.herokuapp.com/bookings",{
         method: "POST",
         mode: 'cors',
         cache: 'no-cache',
         credentials: 'same-origin' ,
         headers:{
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(newBooking)
       }).then(res=>res.json())
       .then(data=>{
         console.log(newBooking)
         console.log(data)
           
           setTabValue3();
       }).catch(err=>{
           console.log(`ERROR : ${err}`);
       })
     }
    
    
    const locale = 'en';
  const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  React.useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${today.toLocaleDateString(locale, { month: 'long' })} ${today.getDate()} \n\n`;

  const hour = today.getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric'});

     const { setValue, bookingData, setBookingData } = useContext(coviDotsContext);
    const setTabValue2 = () => {
        setValue(2);
    }
 
    const setTabValue3 = () => {
           bookingData.booking_date = "2021-08-14";
           bookingData.booking_time = "10-10:30 AM";
           bookingData.vaccine_type = "Pfizer";
          setBookingData(bookingData);
          setValue(3);
  }
    return (
        <div className = "providerContainer">
            <p>Covid 19 vaccine information:</p>
              <p>  Please select the time slot or book using the available timeslot </p>
              <form action="/" method="POST" onSubmit={submitForm}>
            <button  type="submit" value = {date} onClick={(date) => setNewBooking({
               ...newBooking,
               booking_date:date.target.value,
               booking_time:date.target.innerText
             })}>Book Now: {date} @ {time} </button> 
            <button onClick={setTabValue2} type="submit">View All Availability</button> 
            </form>
        </div>
    )
}

export default SelectTheProvider
