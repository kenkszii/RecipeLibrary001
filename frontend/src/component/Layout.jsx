import React from "react"

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbarr from "./Layout/NavBarr"
import Footer from "./Layout/Footer"

function Layout (props) {
  return (
    <>
    <Navbarr />

    {props.children}


    <Footer/>
    </>
      
    
  )
}

export default Layout
