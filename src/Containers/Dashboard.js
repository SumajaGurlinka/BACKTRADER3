import React, { useEffect } from "react";

import { Avatar, Box, Button, Grid } from "@mui/material";
import Divider from "@mui/joy/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { connect } from "react-redux";
import StopIcon from "@mui/icons-material/Stop";
import { SessionTypes } from "../utils/sessionUtils";
import PauseIcon from "@mui/icons-material/Pause";
import jwtDecode from "jwt-decode";

import Typography from "@mui/joy/Typography";
import { user } from "../store/user";

const Dashboard = (props) => {
  const { user,getMarginAsync,margin} = props;
 
  const details = localStorage.getItem("token");
  const userDetails = jwtDecode(details);
  const firstName = userDetails.firstname;
  const marginAvailable = margin.marginData.marginAvailable;
  const marginUsed = margin.marginData.marginUsed;
  
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const formatNumber = (num) => {
      if (num >= 10000000) {
        return (num / 10000000).toFixed(2) + "cr";
      } else if (num >= 100000) {
        return (num / 100000).toFixed(2) + "L";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + "k";
      } else {
        return num;
      }
    };
    const formattedMarginUsed = formatNumber(marginUsed);
    const formattedMarginavailable = formatNumber(marginAvailable);

    const getmargin = async () => {
      try {
        await getMarginAsync();
       
      } catch (error) {}
    };
   
  
    useEffect(() => {
      getmargin();
    }, [getMarginAsync]);
    
 
   
    

  return (
    <>
      <Box
        sx={{
          height: "88.5vh",
          background: "#FCFCFC",
          marginLeft: "1px",
         
          overflow: user.scroll ? "auto" : "",
          '@media (max-width: 600px)': {
            width: "100%",
           marginLeft:0,
         height:"1330px"
          },
        }}
      >
        <Box
          sx={{
            height: "60px",

            display: "flex",

            alignItems: "center",

            marginLeft: "10px",

            marginRight: "10px",
          }}
        >
          <Typography sx={{ fontSize: "25px", margin: "10px" }}>
            Hi ,{formattedFirstName}
          </Typography>
        </Box>
        <Divider sx={{ margin: "10px" }} />
        <Grid container style={{ marginLeft: "20px", marginTop: "20px" }}>
          <Grid item xs={6} sm={6}>
            <Typography level="h6">{formattedMarginavailable}</Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography>Margin Used</Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography>{formattedMarginUsed}
</Typography>
          </Grid>
        </Grid>
        <Grid container style={{ marginLeft: "20px" }}>
          <Grid item xs={6} sm={6}>
            <Typography>Margin Available</Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography>Opening Balance</Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
  <Typography>1cr</Typography>
</Grid>
        </Grid>
        <Typography
          level="h5"
          style={{
            margin: "20px",
          }}
        >
          Session Details
        </Typography>

        <Divider sx={{ marginLeft: "10px", marginRight: "10px" }} />

        <Grid container style={{ margin: "20px" }}>
          <Grid item xs={5} sm={5}>
            <Typography level="h6">Session Type</Typography>
          </Grid>
          <Grid item xs={7} sm={7}>
            <Typography>{user?.activeSessionType}</Typography>
          </Grid>
        </Grid>
        {user.activeSessionType === SessionTypes.SELECT_DATE && (
          <Grid container style={{ marginLeft: "20px" }}>
            <Grid item xs={5} sm={5}>
              <Typography level="h6">Date</Typography>
            </Grid>
            <Grid item xs={7} sm={7}>
              <Typography>{user.date}</Typography>
            </Grid>
          </Grid>
        )}  </Box>
        </>
      );
    };
const mapStateToProps = (state) => ({
  user: state.user,
  margin:state.margin,
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,
  setActiveSessionType: dispatch.user.setActiveSessionType,
  getOrdersAsync: dispatch.orders.getOrdersAsync,
  setQuantitySession:dispatch.user.setQuantitySession,
  getMarginAsync:dispatch.margin.getMarginAsync,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
