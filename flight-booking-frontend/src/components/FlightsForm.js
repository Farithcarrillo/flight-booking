import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FlightsForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [peopleQty, setPeopleQty] = useState("");
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const navigate = useNavigate();

  // Load countries from API
  const loadCountries = async () => {
    try {
      const response = await fetch("http://localhost:4000/countries");
      const data = await response.json();
      const origins = data.map((item) => item.origin);
      const destinations = data.map((item) => item.destination);
      setOrigin(origins);
      setDestination(destinations);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const year = checkInDate.getFullYear();
    const month = String(checkInDate.getMonth() + 1).padStart(2, "0");
    const day = String(checkInDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const queryParams = `?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(
      formattedDate
    )}&peopleQty=${encodeURIComponent(peopleQty)}`;

    navigate(`/vuelos-disponibles${queryParams}`);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handlePeopleQtyChange = (event) => {
    setPeopleQty(event.target.value);
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="hero-text">
              <h1>Flights Booking</h1>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
            <div className="booking-form">
              <h3>Reserva tu vuelo</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="select-option">
                  <label htmlFor="from">From:</label>
                  <select id="from" value={from} onChange={handleFromChange} required>
                    <option value="">Select</option>
                    {origin.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select-option">
                  <label htmlFor="to">To:</label>
                  <select id="to" value={to} onChange={handleToChange} required>
                    <option value="">Select</option>
                    {destination.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="check-date">
                  <label htmlFor="date-in">Check In:</label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="date-input"
                    id="date-in"
                    required
                  />
                  <i className="icon_calendar"></i>
                </div>
                <div className="select-option">
                  <label htmlFor="people-qty">Number of People:</label>
                  <input
                    type="number"
                    className="people-qty"
                    id="people-qty"
                    value={peopleQty}
                    onChange={handlePeopleQtyChange}
                    required
                  />
                </div>
                <button type="submit" className="check">
                  Search Flights
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-slider owl-carousel">
        <div className="hs-item set-bg"></div>
        <div className="hs-item set-bg"></div>
        <div className="hs-item set-bg"></div>
      </div>
    </section>
  );
}
