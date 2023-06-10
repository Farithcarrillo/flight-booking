import React, { useState } from 'react';

export default function Bookings() {
  const [booking, setBooking] = useState('');
  const [reservation, setReservation] = useState([]);

  // Search for booking
  const searchBooking = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/reservations/item?id=${booking}`);
      const data = await response.json();
      setReservation(data);
      console.log(data);
    } catch (error) {
      console.error('Error searching for booking:', error);
    }
  };

  // Handle booking input change
  const handleBookingChange = (event) => {
    setBooking(event.target.value);
  };

  return (
    <section className="hero-section-booking">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-text">
              <h1>Search for your reservation</h1>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 offset-xl-12 offset-lg-12">
            <div className="booking-form">
              <h3>Enter your flight number</h3>
              <form onSubmit={searchBooking}>
                <div className="search-booking">
                  <input type="text" className="date-input" id="date-in" value={booking} onChange={handleBookingChange} />
                </div>
                <button type="submit">Search Reservation</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-slider owl-carousel">
        <div className="hs-item set-booking"></div>
        <div className="hs-item set-booking"></div>
        <div className="hs-item set-booking"></div>
      </div>

      {reservation.map((flight) => (
        <div className="col-lg-4 col-md-6" key={flight.id}>
          <div className="room-item">
            <img src="img/room/room-1.jpg" alt="" />
            <div className="ri-text">
              <h4>{flight.airline}</h4>
              <h3>${flight.price}<span>/Per Passenger</span></h3>
              <table>
                <tbody>
                  <tr>
                    <td className="r-o">Flight:</td>
                    <td>{flight.id}</td>
                  </tr>
                  <tr>
                    <td className="r-o">Origin:</td>
                    <td>{flight.origin}</td>
                  </tr>
                  <tr>
                    <td className="r-o">Destination:</td>
                    <td>{flight.destination}</td>
                  </tr>
                  <tr>
                    <td className="r-o">Date:</td>
                    <td>{flight.departure_date.slice(0, 10)}</td>
                  </tr>
                  <tr>
                    <td className="r-o">Time:</td>
                    <td>{flight.departure_time}</td>
                  </tr>
                  <tr>
                    <td className="r-o">Quantity:</td>
                    <td>{flight.passenger_qty_reservation}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
