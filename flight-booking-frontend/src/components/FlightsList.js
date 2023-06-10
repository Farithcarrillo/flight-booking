import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function FlightsList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [flights, setFlights] = useState([]);

  // Get the values of the form parameters
  const from = queryParams.get('from');
  const to = queryParams.get('to');
  const date = queryParams.get('date');
  const peopleQty = queryParams.get('peopleQty');

  console.log(flights);

  const loadFlights = async () => {
    try {
      const response = await fetch(`http://localhost:4000/flights?param1=${from}&param2=${to}&param3=${date}&param4=${peopleQty}`);
      const data = await response.json();
      console.log(data);
      setFlights(data);
    } catch (error) {
      console.error('Error loading flights:', error);
    }
  };

  useEffect(() => {
    loadFlights();
  }, []);

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Available Flights</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {flights.length !== 0 ? (
        <section className="rooms-section spad">
          <div className="container">
            <div className="row">
              {flights.map((flight) => (
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
                        </tbody>
                      </table>
                      <Link to={`/reservar-vuelos?vuelo=${flight.id}`} className="primary-btn" style={{ fontSize: '16px' }}>Book</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="sectionNotFound">
          <div className="page">Oops!!! No flights found for the selected filter.</div>
          <Link to="/">
            <a className="back-home" href="#!">Back to home</a>
          </Link>
        </div>
      )}
    </>
  );
}
