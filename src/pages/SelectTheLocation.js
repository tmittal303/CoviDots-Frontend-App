import React, { useState, useContext } from "react";
import "../css/App.css";
import coviDotsContext from '../context/coviDotsContext';

const SelectTheLocation = props => {
    const [word, setWord] = useState("");
    const { setValue, setBookingData } = useContext(coviDotsContext);
    const [filterDisplay, setFilterDisplay] = useState(props.locations)
    const handleChange = e => {
        let oldList = props.locations.map(locationfull => {
            return {
                postalCode: locationfull.postalCode.toLowerCase(),
                keyId: locationfull.location_id,
                lname: locationfull.location_type,
                address: locationfull.address_line,
                city: locationfull.city,
                province: locationfull.province,
                country: locationfull.country,
                id:locationfull._id
            }
        });

        if (e !== "") {
            let newList = [];
            setWord(e);
            //newList =  oldList.filter(location => location.pin.includes(word.toLowerCase()));
            newList = oldList.filter(locationfull => locationfull.postalCode.includes(word.toLowerCase()));
            setFilterDisplay(newList);
        }
        else {
            setFilterDisplay(props.locations);
        }

    };
    const setTabValue = (locid) => {
        return () => {
            setValue(1);
            let bookingData = { location_id: locid };
            setBookingData(bookingData);
            console.log(bookingData);
        }
    }
    return (

        <div className="locationContainer">
            <h1>&nbsp;Locations </h1>
            &nbsp; Enter the PinCode: <input onChange={e => handleChange(e.target.value)} />
            <br />
            <br />
            <br />
            <form method="post" action="/location">
                {filterDisplay.map((locationfull, i) => (
                    <div className="border1" key={i} >
                        <p> &nbsp; {locationfull.lname}&nbsp;
                            <ol>{locationfull.address}</ol>
                            <ol>{locationfull.city}</ol>
                            <ol>{locationfull.province} - {locationfull.postalCode} </ol> 
                            <ol>{locationfull._id}</ol></p>
                        <button type="submit" onClick={setTabValue(locationfull.id)}>SUBMIT</button>

                    </div>

                ))}
            </form>
        </div>
    );
};
export default SelectTheLocation;
