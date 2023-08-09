import React from "react";
import { useState } from "react";
import { Button, Typography,} from "@mui/material";
import { Box, Grid, } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TextField } from "@mui/material";
import WebStoriesIcon from '@mui/icons-material/WebStories';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { connect } from "react-redux";

import { ClassNames } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import Orders1 from "../Containers/Orders1";
import { SessionTypes } from "../utils/sessionUtils";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Favourite from "../Favourites/Favourite";
import Payment1 from "./Payment1";
const useStyles = makeStyles((theme) => {
  return {
app:{
 
    height: "100vh",
    width: "100vw",
   
   
    display: "flex",
    flexdirection: "column"
  }
  

  };
});


//px, em, rem
//vh,

const Payment2 = (props) => {
  const classes = useStyles();
  const [isFavouriteOpen, setIsFavouriteOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 
  return (
    <>
   <div className={ClassNames.app}>
      <Grid container style={{ height: "100vh" }}>
      <Box
      
          sx={{
            height: "100vh",
            width: "100vw",
            margin: 0,
            display: isMobile ? "":"flex",
            flexDirection:isMobile ?  "": "row",
        }}
      >
         {!isMobile && <Favourite />}
        <Box display="flex" sx={{ flex: 2 }}>
        <Payment1/>
        </Box>
      </Box>
          </Grid>
          
          </div>{isFavouriteOpen && isMobile && <Favourite />}
    </>
  );
};




export default Payment2;