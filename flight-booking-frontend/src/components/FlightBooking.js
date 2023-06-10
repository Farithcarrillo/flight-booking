import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export default function FlightBooking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const flightId = queryParams.get('vuelo');
  const [getFlight, setGetFlight] = useState([]);
  const [Identification, setIdentification] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Qty, setQty] = useState('');
  const [booking, setBooking] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch flight details when flightId changes
    if (flightId) {
      loadFlight();
    }
  }, [flightId]);

  const loadFlight = async () => {
    try {
      const response = await fetch(`http://localhost:4000/flights/item?id=${flightId}`);
      const data = await response.json();
      console.log(data[0]);
      setGetFlight(data[0]);
    } catch (error) {
      console.error('Error loading flight:', error);
    }
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/reservations', {
        method: 'POST',
        body: JSON.stringify({
          flight_id: flightId,
          passenger_identification: Identification,
          passenger_name: Name,
          passenger_email: Email,
          passenger_phone: Phone,
          passenger_qty_reservation: Qty
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      console.log(data);
      setBooking(true);
      setBookingId(data.id);
      // Redirect to FlightsList with form parameters
      // navigate(`/`);
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  const handleIdentificationChange = (event) => {
    setIdentification(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Book Flight #{getFlight.id}</h2>
                <div className="bt-option">
                  <a href="./home.html">Home</a>
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!booking ? (
        <section className="room-details-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="room-details-item">
                  <img src="img/room/room-details.jpg" alt="" />
                  <div className="rd-text">
                    <div className="rd-title">
                      <h3>{getFlight.airline}</h3>
                    </div>
                    <h2>${getFlight.price}<span>/Per Passenger</span></h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Origin:</td>
                          <td>{getFlight.origin}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Destination:</td>
                          <td>{getFlight.destination}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Date:</td>
                          <td>{getFlight.departure_date}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Time:</td>
                          <td>{getFlight.departure_time}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="room-booking">
                  <h3>Passenger Information</h3>
                  <form onSubmit={handleReservationSubmit}>
                    <input type="hidden" className="date-input" id="date-in" value={getFlight.id} />
                    <div className="check-date">
                      <label htmlFor="date-in">Identification:</label>
                      <input type="text" className="date-input" id="date-in" value={Identification} onChange={handleIdentificationChange} required />
                      <i className="icon_calendar"></i>
                    </div>
                    <div className="check-date">
                      <label htmlFor="date-out">Full Name:</label>
                      <input type="text" className="date-input" id="date-out" value={Name} onChange={handleNameChange} required />
                      <i className="icon_calendar"></i>
                    </div>
                    <div className="check-date">
                      <label htmlFor="date-out">Email:</label>
                      <input type="text" className="date-input" id="date-out" value={Email} onChange={handleEmailChange} required />
                      <i className="icon_calendar"></i>
                    </div>
                    <div className="check-date">
                      <label htmlFor="date-out">Phone:</label>
                      <input type="number" className="date-input" id="date-out" value={Phone} onChange={handlePhoneChange} required />
                      <i className="icon_calendar"></i>
                    </div>
                    <div className="check-date">
                      <label htmlFor="date-out">Quantity:</label>
                      <input type="number" className="date-input" id="date-out" value={Qty} onChange={handleQtyChange} required />
                      <i className="icon_calendar"></i>
                    </div>
                    <button type="submit" className="check">
                      Book
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="col-lg-12 sectionSuccess">
          <div className="cardSuccess">
            <div className="containerSuccess">
              <i className="checkmark">✓</i>
            </div>
            <h1 className="titleSuccess">Reserved</h1>
            <p className="successP">Your reservation has been created successfully;<br />Reservation Number: <b>{bookingId}</b></p>
            <Link to={`/`}>
              <button className="btnSuccess">
                Back
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
