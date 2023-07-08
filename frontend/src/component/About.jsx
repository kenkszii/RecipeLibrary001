import React from "react";

import ImageAbout from "../static/img/about_img.png"


function About () {
  return (
        <section id="about">
            <div className="container">
                <div className="title">
                    <h2>About Recipe Library</h2>
                    <p>More than 2000 users</p>
                </div>
                <div className="about-content">
                    <div>
                        <p>
                            At Recipe Library, we believe that cooking is an art form,
                             a means of self-expression, and a way to bring people together. 
                             We understand that every individual has their unique culinary journey, 
                             filled with family traditions, personal creations, and favorite dishes. 
                             That's why we created this app to provide you with a digital space where you can create,
                            store, and explore an extensive collection of recipes.
                        </p>
                        
                        <p>
                          Our mission is to empower you to become the chef of your own kitchen, 
                          to experiment with flavors, and to share your culinary delights with the world.
                          Whether you're a seasoned cook or just starting out, 
                          Recipe Library is here to support and inspire you every step of the way.
                        </p>
                        <a href="/" className="btn btn-secondary">LEARN MORE</a>
                    </div>
                    <img src={ImageAbout} alt="Pizza"/>
                </div>
            </div>
        </section>
  )
}
export default About;
