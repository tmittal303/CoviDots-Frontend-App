import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SelectTheLocation from './SelectTheLocation';
import SelectTheProvider from './SelectTheProvider';
import SelectTheAppointmentTime from './SelectTheAppointmentTime';
import SignIn from './SignIn';
import RegisterTab from './RegisterTab';
import ConfirmationPage from './ConfirmationPage'
import coviDotsContext from '../context/coviDotsContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const { value, setValue, openRegisterTab } = useContext(coviDotsContext);

  const handleChange = (event, newValue) => {
    if (newValue < value)
      setValue(newValue);
  };
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch("https://calm-journey-19361.herokuapp.com/locations").then(response => {
      return response.json()
    }).then((json) => {
      setLocations(json);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="simple tabs example" variant="fullWidth">
          <Tab tabfor="0" label="Location" {...a11yProps(0)} />
          <Tab tabfor="1" label="Select the provider" {...a11yProps(1)} />
          <Tab tabfor="2" label="Select the Appointment Time" {...a11yProps(2)} />
          {openRegisterTab === false ? (
            <Tab tabfor="3" label="Sign In" {...a11yProps(2)} />
          ) : (
            <Tab tabfor="3" label="Register" {...a11yProps(2)} />
          )}

          <Tab tabfor="4" label="Confirmation Page" {...a11yProps(2)} />

        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} tabid="0">
        <SelectTheLocation locations={locations} />
      </TabPanel>
      <TabPanel value={value} index={1} tabid="1">
        <SelectTheProvider />
      </TabPanel>
      <TabPanel value={value} index={2} tabid="2">
        <SelectTheAppointmentTime />
      </TabPanel>
      <TabPanel value={value} index={3} tabid="3">
        {openRegisterTab === false ? (
          <SignIn />
        ) : (
          <RegisterTab />
        )}
      </TabPanel>
      <TabPanel value={value} index={4} tabid="4">
        <ConfirmationPage />
      </TabPanel>
    </div>
  );
}
