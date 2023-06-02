import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';

import App from "./App.jsx";


function InitRoutes() {
  return (
    <Router>
      <App />
    </Router>
  );
};


export default InitRoutes;
