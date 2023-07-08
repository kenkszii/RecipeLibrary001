import React from "react"

import logo from "../../static/img/logo.png"

const NavBarr = () => {
  return (
      <div className="header">
          <div id="navbar" >
            <img src={logo} alt="Food Lover Logo"/>
            <nav role="navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="/login">RecipeLibrary</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
          </div>
        <div className="content">
            <h1>
              Welcome To&nbsp;
              <span className="primary-text">
                Rrecipe Library 
              </span> 
            </h1>
          <p>
            Here you can create, Edit and Store your Recipe
          </p>
          <a href="#contact" className="btn1 btn1-primary">
            Get Started
          </a>
      </div>
    </div>

  )
}

export default NavBarr;
