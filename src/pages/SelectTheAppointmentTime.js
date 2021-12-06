import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import coviDotsContext from '../context/coviDotsContext';
import { Button} from 'react-bootstrap';

const columns = [
  { id: 'day1', label: new Date().toLocaleString().slice(0, 10), minWidth: 170 },
  { id: 'day2', label: new Date().toLocaleString().slice(0, 10), minWidth: 170 },
  { id: 'day3', label: new Date().toLocaleString().slice(0, 10), minWidth: 170 }
];

function addMinutes(time, minutes) {
  var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
  var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
    ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes());
  return tempTime;
}

function createSlots() {
  var starttime = "09:00";
  var interval = "15";
  var endtime = "07:00";
  var timeslots = [starttime];
  var slotData = [];
  while (starttime != endtime) {
    starttime = addMinutes(starttime, interval);
    timeslots.push(starttime);
  }
  for (var i = 0; i < timeslots.length; i++) {
    slotData.push(timeslots[i]);
    //createData(<button type="submit">{timeslots[i]}</button>,
    // <button type="submit">{timeslots[i]}</button>, 
    //<button type="submit">{timeslots[i]}</button>));
  }
  return slotData;
}

function createDates() {
  var dateData = [];
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayafter = new Date(today)
  dayafter.setDate(tomorrow.getDate() + 2)
  let day1 = today.toLocaleString().slice(0, 9);
  dateData.push({ id: 'day1', label: day1, minWidth: 170 });
  let day2 = tomorrow.toLocaleString().slice(0, 9);
  dateData.push({ id: 'day2', label: day2, minWidth: 170 });
  let day3 = dayafter.toLocaleString().slice(0, 9);
  dateData.push({ id: 'day3', label: day3, minWidth: 170 });
  return dateData;
}

function createData(day1, day2, day3) {

  return { day1, day2, day3 };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
const SelectTheAppointmentTime = () => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [slotData, setSlotData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const { setValue, bookingData, setBookingData } = useContext(coviDotsContext);

  const setTabValue = (time, id) => {
    return () => {
      setValue(3);
      bookingData.booking_date = dateData[id].label;
      bookingData.booking_time = time;
      bookingData.vaccine_type = "Pfizer";
      setBookingData(bookingData);
      console.log(bookingData);
    }
  }

  useEffect(() => {
    let slotData = createSlots();
    setSlotData(slotData);
    console.log(slotData);
    let datedata = createDates();
    setDateData(datedata);
    console.log(datedata);
    //console.log(rows);
  }, [])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {dateData.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slotData.map((item) => (
              <TableRow >
                <TableCell >
                <Button variant="success" onClick={setTabValue(item, 1)}  className="booknow-button !important" size="md">{item}</Button>
                </TableCell>
                <TableCell >
                <Button variant="success" onClick={setTabValue(item, 2)}  className="booknow-button !important" size="md">{item}</Button>
                </TableCell>
                <TableCell >
                <Button variant="success" onClick={setTabValue(item, 2)}  className="booknow-button !important" size="md">{item}</Button>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  )
}

export default SelectTheAppointmentTime
