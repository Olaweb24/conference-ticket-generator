import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JsBarcode from "jsbarcode";
import "../styles/TicketGeneration.css";

const TicketGeneration = () => {
  const navigate = useNavigate();
  const barcodeRef = useRef(null);
  
  // Retrieve stored user data
  const [userData, setUserData] = useState({
    fullName: localStorage.getItem("fullName") || "",
    email: localStorage.getItem("email") || "",
    avatar: localStorage.getItem("avatar") || "", 
    ticketType: localStorage.getItem("ticketType") || "General",
    ticketCount: localStorage.getItem("ticketCount")
  });

  useEffect(() => {
    // Ensure email is available before generating barcode
    if (userData.email && barcodeRef.current) {
      JsBarcode(barcodeRef.current, userData.email, {
        format: "CODE128",
        displayValue: true,
        fontSize: 16,
        width: 2,
        height: 50,
        background: "#fff",
        lineColor: "#000",
      });
    }
  }, [userData.email]);

  return (
  
    <div className="ticket-wrapper">
      <h1 className="ticket-heading">Your Ticket is Booked</h1>
      <p className="ticket-paragraph">check your email for a copy or you can download</p>
      <div className="ticket-container">
      <div class="cut-edge top-left"></div>
      <div class="cut-edge top-right"></div>
      
      <div className="ticket">
        {/* Left Section - User Details */}
        <h3 className="event-name">TechemberFest "25</h3>
        <p className="event-paragraph">04 Rumuokparali, Port Harcourt, Rivers</p>
        <p className="event-paragraph">February 25, 2025 | 7:00 PM</p>
        
        <div className="ticket-left">
          <img src={userData.avatar} alt="User Avatar" className="avatar" />
        </div>

        <div className="ticket-name-container">
          <div><h3 className="ticket-name">{userData.fullName}</h3></div>
          <div><p className="ticket-email">{userData.email}</p></div>
          <div><p className="ticket-type">Ticket Type: <strong>{userData.ticketType}</strong></p></div>
          <div><p className="ticket-count">Ticket Count: <strong>{userData.ticketCount}</strong></p>
          </div>
        
        </div>

       
          <div className="barcode-container">
            <svg ref={barcodeRef}></svg>
          </div>
         
          
      <button className="home-btn" onClick={() => navigate("/")}>
        Book Another Ticket
      </button>
       
      </div>

     
      
      
    </div>
    </div>
    
  );
};

export default TicketGeneration;
