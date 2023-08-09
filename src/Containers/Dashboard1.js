import React, { useState, useEffect } from "react";

import { Button, IconButton, TextField, Tooltip, Typography } from "@mui/material";

import { Box, Grid } from "@mui/material";

import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import makeStyles from "@mui/styles/makeStyles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { SessionTypes } from "../utils/sessionUtils";

import { ToastContainer, toast } from "react-toastify";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import WebStoriesIcon from "@mui/icons-material/WebStories";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { connect } from "react-redux";

import Header1 from "../Containers/Header1";

import Favourite from "../Favourites/Favourite";
import { SYMBOLS } from "../data/Symbol";
// import Select, { components } from "react-select";

import { Select } from "@mui/material";

import { MARKET_PATTERNS } from "../data/MarketPatterns";

import { MenuItem } from "@mui/material";
import {InputLabel} from "@mui/material";
import { FormControl } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";




const useStyles = makeStyles((theme) => ({
  app: {
    height: "100vh",

    width: "100vw",

    display: "flex",

    flexDirection: "column",
  },

  dialogPaper: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    width: '30%',
    overflow: "hidden",
  },
}));

const Dashboard1 = (props) => {
  const classes = useStyles();

  
const symbol=SYMBOLS;
  const {
    stock,

    getStockAsync,

    user,

    setPaidSession,
    getSpickedAsync,
    setActiveSessionType,
setLoading,
getSymbolAsync,
    setDate,
  } = props;

  const [selectedBox, setSelectedBox] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [symbolExists, setSymbolExists] = useState(null);
  const [selectedSessionType, setSelectedSessionType] = useState(null);
  const [isFavouriteOpen, setIsFavouriteOpen] = useState(false);
  const[Symbol,setSymbol]=useState("A");
  const [selectedSymbol, setSelectedSymbol] = useState("A");
  const [selectedSymbol1, setSelectedSymbol1] = useState(symbol[0]);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [marketPattern, setMarketPattern] = useState(MARKET_PATTERNS[0].value);
  const [isHovering, setIsHovering] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };
  
  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };
 
  const handleContinue = async () => {
    setPaidSession(false);
    const selectedPattern = MARKET_PATTERNS.find((pattern) => pattern.value === marketPattern);
    if (selectedPattern) {
      setDate(selectedPattern.label);
    }
   
    try {
      if (selectedBox === 0) {
        
        const data = {
          selectedSymbol: selectedSymbol,
          marketPattern: marketPattern,
        };
        await getStockAsync(data);
        toast.success('Stock data fetched successfully!');
      } else if (selectedBox === 1) {
       
        const data = {
          selectedSymbol: selectedSymbol1,
         
        };
        await getSpickedAsync(data); toast.success('System Picked data fetched successfully!'); 
        
      } 
     
    } catch (error) {
      toast.error('An error occurred while fetching data. Please try again.');setLoading(false);
    }
  };
  const filteredOptions = symbol.filter((symbol) =>
  symbol.toLowerCase().includes(inputValue.toLowerCase())
);
const filteredOptions1 = symbol.filter((symbol) =>
  symbol.toLowerCase().includes(inputValue1.toLowerCase())
);
const handleSymbol=(event)=>{
  setSymbol(event.target.value);
  setSymbolExists(null);
}
const handleArrowClick =  async () => {
  try{
    const data = {
      Symbol: Symbol,
     
    };
  
    const exists = await getSymbolAsync(data); 
    setSymbolExists(exists);
  } catch (error) {
    
    console.error('An error occurred:', error);
  }
};
const handleSymbolChange = (event, newValue) => {
  if (newValue) {
   
    const selectedValue = newValue.symbol;
    setSelectedSymbol(selectedValue);
    setMenuOpen(false);
  } else {
    setSelectedSymbol(null); 
  }
};
  const handleSymbol1Change = (e) => {
    const { value } = e.target;

    setSelectedSymbol1(value);
  };

  const handleMarketPatternChange = (e) => {
    setMarketPattern(e.target.value);
  };
  const handleclose=()=>{
setPaidSession(false);
  }

  const handleBoxClick = (boxIndex) => {
    let sessionType;

    switch (boxIndex) {
      case 0:
        sessionType = SessionTypes.SELECT_DATE;

        break;

      case 1:
        sessionType = SessionTypes.SYSTEM_PICKED;

        break;

      case 2:
        sessionType = SessionTypes.MARKET_PATTERN;

        break;

      default:
        sessionType = "not sent";

        break;
    }

    setSelectedBox(boxIndex);

    setSelectedSessionType(sessionType);

    setActiveSessionType(sessionType);
  };

  return (
    <>
      <div className={classes.app}>
        <Grid container style={{ height: "100vh" }}>
          <Box
            sx={{
              height: "100vh",

              width: "100vw",

              margin: 0,

              display: isMobile ? "" : "flex",

              flexDirection: isMobile ? "" : "row",
            }}
          >
          {!isMobile && <Favourite />}

            <Box display="flex" sx={{ flex: 2 }}>
              <Header1 />
            </Box>
          </Box>
        </Grid>

        <Dialog
          open={user.paidSession}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle sx={{
           display:"flex",justifyContent:"space-between",marginLeft:"0px",paddingLeft:"10px"
           
          }}><>Start your Session
          <Tooltip title="Close">
          <IconButton sx={{margin:'0px',position:"absolute",top:"10px",right:'5px'}}onClick={handleclose}><CloseIcon /></IconButton>
        </Tooltip></></DialogTitle>

          <DialogContent>
            <Box sx={{ display: "flex", flexWrap: "wrap" ,gap:"10px",marginLeft:"30px"}}>
              <Box
                sx={{
                  border:
                    selectedBox === 0 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  borderRadius: "10px",

                  width: "100px",

                  margin: "8px",

                  display: "flex",

                  alignItems: "center",

                  flexDirection: "column",

                  justifyContent: "center",
                  }}  //   onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                onClick={() => handleBoxClick(0)}
              >
                <CalendarMonthIcon sx={{ fontSize: 32 }} />

                {SessionTypes.SELECT_DATE}
                {/* {isHovering && (
        <input
          type="text"
          placeholder="Enter value"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )} */}
              </Box>

              <Box
                sx={{
                  border:
                    selectedBox === 1 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  width: "100px",

                  margin: "8px",

                  display: "flex",

                  alignItems: "center",

                  borderRadius: "10px",

                  flexDirection: "column",

                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(1)}
              >
                <WebStoriesIcon sx={{ fontSize: 32 }} />

                {SessionTypes.SYSTEM_PICKED}
              </Box>

             
            </Box>
          </DialogContent>

          <DialogActions sx={{ flexDirection: "column", alignItems: "center" }}>
          {selectedBox === 0 && (
              <>
                 {" "}<Autocomplete
  fullWidth
  size="small"
  options={filteredOptions}
  value={selectedSymbol}
  inputValue={inputValue}
  onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
  onChange={(event, newValue) => {
    setSelectedSymbol(newValue);
    setInputValue('');
  }}
  open={menuOpen &&!!inputValue} 
  
  onOpen={() => setMenuOpen(true)} 
  onClose={() => setMenuOpen(false)} 
  getOptionLabel={(option) => option} 
  renderInput={(params) => (
    <TextField
      {...params}
      variant="outlined"
      label="Select Symbol"
      sx={{ marginBottom: "20px",marginRight:"10px" }}
    />
  )}
/> 

{/* <TextField
      fullWidth
      variant="outlined"
      label="Select Symbol"
      value={Symbol} 
      onChange={handleSymbol} 

     sx={{marginRight:"10px",marginLeft:"10px", "& .MuiOutlinedInput-root": {
      marginBottom:"18px",
    
        height: "42px",
      },
      "& .MuiIconButton-root": {
        marginLeft: "30px",
        padding:"3px" // Adjust this value as needed
      },
    }}
      InputProps={{
        endAdornment: (
          <IconButton edge="end" onClick={handleArrowClick}>
            {symbolExists === true ? (
              <CheckCircleIcon style={{ color: 'green' }} />
            ) : symbolExists === false ? (
              <ErrorIcon style={{ color: 'red' }} />
            ) : (
              <ArrowRightIcon/> 
            )}
          </IconButton>
        ),
      }}
    /> */}





 <FormControl fullWidth variant="outlined" size="small" sx={{ marginBottom: "10px",marginRight:"8px" }}><InputLabel>Select Time series</InputLabel>
 <Select
  fullWidth
  label="Select Time Series"
  variant="outlined"
  onChange={handleMarketPatternChange}
  value={marketPattern}
  menuplacement="bottom"
  menuposition="fixed"
  size="small"
  sx={{ marginBottom: "10px" }}
>
  {MARKET_PATTERNS.map((pattern) => (
    <MenuItem key={pattern.value} value={pattern.value}>
      {pattern.label}
    </MenuItem>
  ))}
</Select></FormControl>
              </>
            )}
            {selectedBox === 1 && (<>
              <Autocomplete
              fullWidth
              size="small"
              options={filteredOptions1}
              value={selectedSymbol1}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) => setInputValue1(newInputValue)}
              onChange={(event, newValue) => {
                setSelectedSymbol1(newValue);
                setInputValue('');
              }}
              open={menuOpen &&!!inputValue1} 
              onOpen={() => setMenuOpen(true)} 
              onClose={() => setMenuOpen(false)} 
              getOptionLabel={(option) => option} 
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Symbol"
                  sx={{ marginBottom: "80px",marginRight:"10px" }}
                />
              )}
            />
           
             </> )}

        

            <Button
              fullWidth
              style={{
                marginBottom: "5px",

                borderRadius: "10px",

                background: "#6ddac5",

                color: "#FCFCFC",

                textTransform: "none",
              }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>{isFavouriteOpen && isMobile && <Favourite />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,

  stock: state.stock,
  spicked:state.spicked
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,

  setActiveSessionType: dispatch.user.setActiveSessionType,
setLoading:dispatch.stock.setLoading,
  setDate: dispatch.user.setDate,
  getSpickedAsync:dispatch.spicked.getSpickedAsync,
  getSymbolAsync:dispatch.symbol.getSymbolAsync,
  getStockAsync: dispatch.stock.getStockAsync,
  setPaidSession:dispatch.user. setPaidSession,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard1);
