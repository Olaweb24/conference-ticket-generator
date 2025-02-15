import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TicketSelection.css";

const TicketSelection = () => {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(localStorage.getItem("ticketType") || "");
  const [ticketCount, setTicketCount] = useState(localStorage.getItem("ticketCount") || "1");

  const tickets = [
    { type: "Free", price: "Free", access: "REGULAR ACCESS", available: "20/52" },
    { type: "VIP", price: "$150", access: "VIP ACCESS", available: "20/52" },
    { type: "VVIP", price: "$150", access: "VVIP ACCESS", available: "20/52" },
  ];

  useEffect(() => {
    localStorage.setItem("ticketType", selectedTicket);
    localStorage.setItem("ticketCount", ticketCount);
  }, [selectedTicket, ticketCount]);

  const handleSelect = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  const handleNext = () => {
    if (selectedTicket) {
      navigate("/profile"); // ✅ Navigates to Profile Upload Page
    }
  };

  return (
    <div className="ticket-selection-container">
      <div className="title-container">
      <h2 className="title">Ticket Selection</h2>
      <p className="step-info">Step 1/2</p>
      </div>  
      
      <div className="progress-bar">
        <div className="progress"></div>
        
      </div>

      <div className="event-container">
        <div className="event-card">
          <h3 className="event-title">Techember Fest '25</h3>
          <p className="event-description">
            Join us for an unforgettable experience at <br />
            <span>TicketFest!</span> Secure your spot now.
          </p>
          <p className="event-location">
            📍 [Event Location] || March 15, 2025 | 7:00 PM
          </p>
        </div>

        <div className="ticket-options">
          <h4>Select Ticket Type:</h4>
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <div
                key={ticket.type}
                className={`ticket-card ${selectedTicket === ticket.type ? "selected" : ""}`}
                onClick={() => handleSelect(ticket.type)}
              >
                <h3 className="ticket-price">{ticket.price}</h3>
                <p className="ticket-type">{ticket.access}</p>
                <span className="ticket-availability">{ticket.available}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ticket-count">
          <label htmlFor="ticket-count">Number of Tickets</label>
          <select
            id="ticket-count"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
          >
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="buttons">
          <button className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
          <button
            className={`next-btn ${!selectedTicket ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={!selectedTicket}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
