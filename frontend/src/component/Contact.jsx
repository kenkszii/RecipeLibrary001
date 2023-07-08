import React from "react";
import { Twitter, Whatsapp, Instagram } from "react-bootstrap-icons";

function Contact() {
  return (
    <div className="resize">
      <section id="contact">

        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div>
                <h3>ADDRESS</h3>
                <p><i className="fa-solid fa-location-dot"></i> D12, D, Plaza,sokoto road Zaria, Kaduna, Nigeria.</p>
                <p><i className="fa-solid fa-phone"></i> Phone: +2348066286427</p>
                <p><i className="fa-regular fa-envelope"></i> Mail Us: kenkszii@gmail.com</p>
              </div>
              <div>
                <h3>WORKING HOURS</h3>
                <p>8:00 am to 6:00 pm on Weekdays</p>
              </div>
              <div>
                <h3>FOLLOW US</h3>
                <a href="https://twitter.com/kenkszii1"><i className="fa-brands fa-facebook-f"><Twitter /></i></a>
                <a href="https://wa.me/+2348181659815"><i className="fa-brands fa-twitter"><Whatsapp /></i></a>
                <a href="https://www.instagram.com/sheyi_ta"><i className="fa-brands fa-instagram"><Instagram /></i></a>
              </div>
            </div>
            <form className="contactform">
              <input type="text" name="Name" id="name" placeholder="Full Name" />
              <input type="email" name="email" id="email" placeholder="Email Address" />
              <input type="text" name="subject" id="subject" placeholder="Subject" />
              <textarea name="message" id="message" cols="30" rows="5" placeholder="Message"></textarea>
              <button type="submit" className="btn btnsend btn-third contactbtn">SEND MESSAGE</button>
            </form>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;
