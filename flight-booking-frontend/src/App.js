import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightsList from './components/FlightsList';
import FlightsForm from "./components/FlightsForm";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import './styles/style.css';
import "../src/styles/bootstrap.min.css";
import "../src/styles/font-awesome.min.css";
import "../src/styles/elegant-icons.css";
import "../src/styles/flaticon.css";
import "../src/styles/owl.carousel.min.css";
import "../src/styles/nice-select.css";
import "../src/styles/magnific-popup.css";
import "../src/styles/slicknav.min.css";
import "../src/styles/style.css";
import Footer from "./components/Footer";
import Bookings from "./components/Bookings";
import FlightBooking from "./components/FlightBooking";

export default function App() {
  return (
    <BrowserRouter>
      {/* Render the Navbar component */}
      <Navbar />
      <Routes>
        {/* Define the routes and their corresponding components */}
        <Route path="/" element={<FlightsForm />} />
        <Route path="/vuelos-disponibles" element={<FlightsList />} />
        <Route path="/reservar-vuelos" element={<FlightBooking />} />
        <Route path="/reservations" element={<Bookings />} />
      </Routes>
      {/* Render the Footer component */}
      <Footer />
    </BrowserRouter>
  );
}
