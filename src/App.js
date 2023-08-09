import logo from "./logo.svg";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { PrivateRoute } from "./Containers/PrivateRoute";
import { Home } from "./Containers/Home";
import Verify from "./Containers/Verify";
import SignUp from "./Containers/SignUp";
import Login from "./Containers/Login";
import Forget from "./Containers/Forget";
import Orders1 from "./Containers/Orders1";
import AdminStock from "./Containers/AdminStock";
import FullPaneItems from "./PaneItems/FullPaneItems";
import { Dashboard } from "@mui/icons-material";
import Dashboard1 from "./Containers/Dashboard1";
import Header1 from "./Containers/Header1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reset from "./Containers/Reset";
import Orders2 from "./Containers1/Orders2";
import Profile2 from "./Containers/Profile2";
import Payment2 from "./Containers/Payment2";
import Admin from "./Containers/Admin";
import AdminSignup from "./Containers/AdminSignup";
const App = () => {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminstock" element={<AdminStock/>} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/fullpane"
          element={
            <PrivateRoute>
              <FullPaneItems />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard1 />
            </PrivateRoute>
          }
        />
        <Route exact path="/reset-password" element={<Reset />} />

        <Route path="/forget" element={<Forget />}></Route>
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
