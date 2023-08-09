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
import Profile from "./Profile";
import { TextField } from "@mui/material";
import WebStoriesIcon from '@mui/icons-material/WebStories';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { connect } from "react-redux";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { ClassNames } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionTypes } from "../utils/sessionUtils";
// import Select , { components }from "react-select";
import moment from "moment";
import { SYMBOLS } from "../data/Symbol";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete"
import { ToastContainer, toast } from "react-toastify";
import { MARKET_PATTERNS } from "../data/MarketPatterns";
import { useTheme } from "@mui/material/styles";
import {InputLabel} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton , Tooltip } from "@mui/material";
import { Select, FormControl } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuItem } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
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




const Profile1 = (props) => {
  const classes = useStyles();
  const marketPatterns = MARKET_PATTERNS;
  const theme = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); 
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [marketPattern, setMarketPattern] = useState(MARKET_PATTERNS[0].value);
  const [isFavouriteOpen, setIsFavouriteOpen] = useState(false);
  const {
    stock,

    getStockAsync,

    user,

    setPaidSession,

    setLoading,
    setActiveSessionType,
    getSpickedAsync,
    setDate,
  } = props;
  const [selectedBox, setSelectedBox] = useState(0);
  const [selectedSessionType, setSelectedSessionType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
 
  const symbol=SYMBOLS; const [selectedSymbol1, setSelectedSymbol1] = useState(symbol[0]);
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [inputValue1, setInputValue1] = useState("");
  const filteredOptions1 = symbol.filter((symbol) =>
  symbol.toLowerCase().includes(inputValue1.toLowerCase())
);
  const customStyles = {
    control: (provided) => ({
      ...provided,
   width:"390px",
      height: "40px",
     marginBottom:"35px",
      borderRadius: "10px",
      border: "1px solid grey",
    }), }
  const options = [
    
      
     
    { value: "Up Trending", label: "Up Trending" },
    { value:  "Down Trending", label:  "Down Trending" },
    { value: "Flat", label:  "Flat" },
    { value:  "Up Trending with Down Close", label:  "Up Trending with Down Close" },
    { value:"Up Trending with Flat Close", label: "Up Trending with Flat Close",}
  



];
  
  const handleBoxClick = (boxIndex) => {
    // Update the selectedSessionType based on the selected box
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
        sessionType = null;
        break;
    }
    setSelectedBox(boxIndex);
    setSelectedSessionType(sessionType);
    setActiveSessionType(sessionType);
  };
  const handleMarketPatternChange = (e) => {
    setMarketPattern(e.target.value);
    
  };
  const handleSymbol1Change = (e) => {
    const { value } = e.target;

    setSelectedSymbol1(value);
  };
  const filteredOptions = symbol.filter((symbol) =>
  symbol.toLowerCase().includes(inputValue.toLowerCase())
  );
  const handleclose=()=>{
    setPaidSession(false);
      }
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
        await getSpickedAsync(data);
        toast.success('System Picked data fetched successfully!');
      } 
     
    } catch (error) {
      toast.error('An error occurred while fetching data. Please try again.');setLoading(false);
    }
  };
 

  const handleSymbolChange = (e) => {
    const { value } = e.target;

    setSelectedSymbol(value);
  };
  return (
    <>
   <div className={ClassNames.app}>
   <Box style={{ height: "100vh" }}>
      <Header />
      
<Profile/>
    </Box>
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
       
          </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,

  stock: state.stock,
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,

  setActiveSessionType: dispatch.user.setActiveSessionType,
  setLoading:dispatch.stock.setLoading,
  setDate: dispatch.user.setDate,
  getSpickedAsync:dispatch.spicked.getSpickedAsync,
 
  getStockAsync: dispatch.stock.getStockAsync,
});
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile1);