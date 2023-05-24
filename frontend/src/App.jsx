import React from "react";
import { Route, Routes} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from "./component/HomePage";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

function App() {
	return ( 

		<Routes>
			<Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
		</Routes>

    
	);
}

export default App;

