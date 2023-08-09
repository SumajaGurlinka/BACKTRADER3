import {
  Button,
  Grid,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import List from "@mui/material/List";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { Paper } from "@mui/material";
import { connect } from "react-redux";
import Illustration1 from "../assets/image/Illustration1.svg";
import Illustration2 from "../assets/image/Illustration2.svg";
import { theme } from "../index.js";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles((theme) => {
  return {};
});

const Admin = (props) => {
  const { login, getLoginAsync } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [selectedIndex1, setSelectedIndex1] = useState(
    parseInt(localStorage.getItem("selectedIndex1"))
  );
  const handleAdmin=()=>{
    navigate("/adminSignup");
    setSelectedIndex1(0);
  };
 
  
  const handleStocks=()=>{
   navigate("/adminstock");
   setSelectedIndex1(1);
  };
  const handleLogout=()=>{
   
   localStorage.removeItem("token");
   toast.success("You have been logged out successfully.");
   
  };
 
  

 

  return (
    <>
      <div className="signup1_container">
        <Paper className="signup1_form_container">
          <Typography
            textAlign="left"
            sx={{ marginBottom: "1em", fontSize: "25px", fontWeight: "bold" }}
          >
            Admin Page
          </Typography>
        
          <List>
        <ListItemButton
          onClick= {handleAdmin}
          sx={{
            color: selectedIndex1 === 0 ? "#7C3AED" : null,
          }}
        >
          <ListItemIcon
            sx={{
              color: selectedIndex1 === 0 ? "#7C3AED" : null,
            }}
          >
            <IconButton>
            < PersonAddAltIcon/></IconButton>
          </ListItemIcon>
          <ListItemText>Add User</ListItemText>
        </ListItemButton>
      </List>

      <List>
        <ListItemButton
          onClick={handleStocks}
          sx={{
            color: selectedIndex1 === 1 ? "#7C3AED" : null,
          }}
        >
          <ListItemIcon
            sx={{
              color: selectedIndex1 === 1 ? "#7C3AED" : null,
            }}
          >
            < ShowChartIcon/>
          </ListItemIcon>
          <ListItemText>Stocks Data</ListItemText>
        </ListItemButton>
      </List>
        
        <Box sx={{display:"flex",flexWrap:"wrap",gap:"20px",marginTop:"50px", "@media (max-width: 600px)": {
          gap:"5px",marginTop:"30px"
          },}}>
        <Box display="flex" justifyContent="center"alignItems='center'>
            <Typography>
              Admin Logout?   <RouterLink to="/login" onClick={handleLogout}>
              Logout  </RouterLink>
            </Typography>
          </Box>
        <Box display="flex" justifyContent="center">
            <Typography>
              SignIn User? <RouterLink to="/login">SignIn</RouterLink>
            </Typography>
          </Box>

          </Box>

          <div></div>
        
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});
const mapDispatchToProps = (dispatch) => ({
  getLoginAsync: dispatch.login.getLoginAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
