import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./static/css/style.css"
import HomePage from "./component/HomePage.jsx";
import Login from "./component/Login.jsx";
import SignUp from "./component/SignUp.jsx";
import Dashboard from "./component/Dashboard.jsx";

import "../src/static/js/axios.js";
import { useAuth } from "./static/js/useAuth";

function App() {
  const { isAuthenticated, GetAuthenticated } = useAuth();



  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          !isAuthenticated
            ? <Login />
            : <Navigate to="/dashboard" />}
        />

        <Route path="/signup"
          element={
            !isAuthenticated
              ? <SignUp />
              : <Navigate to="/dashboard" />}
        />

        <Route path="/dashboard" element={
          isAuthenticated
            ? <Dashboard />
            : <GetAuthenticated />
        }
        />
      </Routes>
    </>
  );
}

export default App;

