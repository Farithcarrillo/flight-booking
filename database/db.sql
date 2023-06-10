//Crear usuario admin en base de datos para la gestion de la aplicación
CREATE ROLE admin WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD '@dmin12345687';

//Crear Base de datos
CREATE DATABASE flight_booking_app
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT ALL ON DATABASE flight_booking_app TO admin;

//Crear Tablas

-- Crear la tabla de vuelos
CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  airline VARCHAR(255) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME NOT NULL,
  available_seats INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Insertar datos de vuelos de prueba
INSERT INTO flights (airline, origin, destination, departure_date, departure_time, arrival_date, arrival_time, available_seats, price)
VALUES
  ('Air Canada', 'Toronto', 'Vancouver', '2023-07-01', '09:00:00', '2023-07-01', '12:00:00', 150, 250.00),
  ('Delta Air Lines', 'New York', 'Los Angeles', '2023-07-01', '13:00:00', '2023-07-01', '16:00:00', 200, 350.00),
  ('British Airways', 'London', 'New York', '2023-07-02', '10:00:00', '2023-07-02', '14:00:00', 180, 450.00),
  ('KLM', 'Amsterdam', 'Paris', '2023-07-02', '15:00:00', '2023-07-02', '17:00:00', 120, 200.00),
  ('Qantas', 'Sydney', 'Melbourne', '2023-07-03', '11:00:00', '2023-07-03', '12:30:00', 100, 150.00),
  ('Lufthansa', 'Frankfurt', 'Munich', '2023-07-03', '14:00:00', '2023-07-03', '15:30:00', 130, 180.00),
  ('Emirates', 'Dubai', 'New York', '2023-07-04', '12:00:00', '2023-07-04', '19:00:00', 220, 600.00),
  ('Air France', 'Paris', 'Rome', '2023-07-04', '09:30:00', '2023-07-04', '11:30:00', 150, 250.00),
  ('United Airlines', 'Chicago', 'San Francisco', '2023-07-05', '08:00:00', '2023-07-05', '10:30:00', 190, 300.00),
  ('Cathay Pacific', 'Hong Kong', 'Tokyo', '2023-07-05', '11:00:00', '2023-07-05', '14:00:00', 170, 400.00),
  ('Singapore Airlines', 'Singapore', 'Bangkok', '2023-07-06', '10:30:00', '2023-07-06', '12:30:00', 140, 220.00),
  ('Qatar Airways', 'Doha', 'Dubai', '2023-07-06', '15:00:00', '2023-07-06', '16:30:00', 160, 180.00),
  ('American Airlines', 'Los Angeles', 'Las Vegas', '2023-07-07', '09:00:00', '2023-07-07', '10:00:00', 120, 150.00),
  ('Ryanair', 'Dublin', 'Barcelona', '2023-07-07', '12:30:00', '2023-07-07', '15:30:00', 200, 250.00),
  ('Turkish Airlines', 'Istanbul', 'Athens', '2023-07-08', '11:30:00', '2023-07-08', '13:00:00', 170, 230.00),
  ('Etihad Airways', 'Abu Dhabi', 'London', '2023-07-08', '14:30:00', '2023-07-08', '21:00:00', 220, 550.00),
  ('Swiss International Air Lines', 'Zurich', 'Geneva', '2023-07-09', '09:00:00', '2023-07-09', '10:00:00', 100, 120.00),
  ('Japan Airlines', 'Tokyo', 'Osaka', '2023-07-09', '12:00:00', '2023-07-09', '14:00:00', 150, 280.00),
  ('LATAM Airlines', 'Santiago', 'Buenos Aires', '2023-07-10', '10:30:00', '2023-07-10', '12:00:00', 130, 200.00),
  ('Virgin Atlantic', 'London', 'New York', '2023-07-10', '13:00:00', '2023-07-10', '17:00:00', 180, 400.00),
  ('Air New Zealand', 'Auckland', 'Wellington', '2023-07-11', '09:30:00', '2023-07-11', '11:00:00', 100, 150.00),
  ('Alitalia', 'Rome', 'Venice', '2023-07-11', '12:30:00', '2023-07-11', '14:00:00', 120, 180.00),
  ('Southwest Airlines', 'Dallas', 'Houston', '2023-07-12', '08:30:00', '2023-07-12', '09:30:00', 90, 100.00),
  ('Iberia', 'Madrid', 'Barcelona', '2023-07-12', '11:00:00', '2023-07-12', '12:30:00', 150, 220.00),
  ('SAS', 'Copenhagen', 'Stockholm', '2023-07-13', '10:00:00', '2023-07-13', '11:30:00', 110, 160.00),
  ('Finnair', 'Helsinki', 'Oslo', '2023-07-13', '14:00:00', '2023-07-13', '16:00:00', 140, 200.00),
  ('JetBlue Airways', 'New York', 'Orlando', '2023-07-14', '09:30:00', '2023-07-14', '12:00:00', 180, 250.00),
  ('Copa Airlines', 'Panama City', 'Bogota', '2023-07-14', '13:30:00', '2023-07-14', '15:30:00', 160, 220.00),
  ('Air India', 'Mumbai', 'Delhi', '2023-07-15', '11:00:00', '2023-07-15', '13:00:00', 200, 300.00),
  ('Norwegian Air Shuttle', 'Oslo', 'Copenhagen', '2023-07-15', '14:30:00', '2023-07-15', '16:00:00', 150, 180.00),
  ('EgyptAir', 'Cairo', 'Istanbul', '2023-07-16', '09:00:00', '2023-07-16', '11:00:00', 170, 240.00),
  ('AirAsia', 'Kuala Lumpur', 'Singapore', '2023-07-16', '12:30:00', '2023-07-16', '14:00:00', 130, 180.00),
  ('Hawaiian Airlines', 'Honolulu', 'Maui', '2023-07-17', '10:30:00', '2023-07-17', '11:30:00', 100, 120.00),
  ('Cathay Dragon', 'Hong Kong', 'Taipei', '2023-07-17', '13:00:00', '2023-07-17', '14:30:00', 120, 160.00),
  ('Vueling Airlines', 'Barcelona', 'Madrid', '2023-07-18', '09:00:00', '2023-07-18', '10:00:00', 90, 110.00),
  ('Korean Air', 'Seoul', 'Tokyo', '2023-07-18', '11:30:00', '2023-07-18', '14:00:00', 160, 280.00),
  ('Saudia', 'Riyadh', 'Dubai', '2023-07-19', '10:30:00', '2023-07-19', '11:30:00', 110, 150.00),
  ('Malaysia Airlines', 'Kuala Lumpur', 'Jakarta', '2023-07-19', '13:30:00', '2023-07-19', '15:00:00', 130, 190.00),
  ('Air Arabia', 'Sharjah', 'Muscat', '2023-07-20', '09:30:00', '2023-07-20', '11:00:00', 100, 140.00),
  ('Kenya Airways', 'Nairobi', 'Johannesburg', '2023-07-20', '12:00:00', '2023-07-20', '15:00:00', 180, 320.00),
  ('SriLankan Airlines', 'Colombo', 'Male', '2023-07-21', '10:00:00', '2023-07-21', '12:00:00', 140, 200.00),
  ('Aeroflot', 'Moscow', 'St. Petersburg', '2023-07-21', '14:30:00', '2023-07-21', '15:30:00', 120, 180.00),
  ('WestJet', 'Calgary', 'Vancouver', '2023-07-22', '09:00:00', '2023-07-22', '10:30:00', 110, 130.00),
  ('TAP Air Portugal', 'Lisbon', 'Porto', '2023-07-22', '12:30:00', '2023-07-22', '14:00:00', 130, 170.00),
  ('Air China', 'Beijing', 'Shanghai', '2023-07-23', '11:00:00', '2023-07-23', '13:00:00', 150, 250.00),
  ('Avianca', 'Bogota', 'Lima', '2023-07-23', '14:00:00', '2023-07-23', '16:00:00', 140, 230.00),
  ('EVA Air', 'Taipei', 'Hong Kong', '2023-07-24', '10:30:00', '2023-07-24', '12:00:00', 120, 160.00),
  ('Austrian Airlines', 'Vienna', 'Zurich', '2023-07-24', '13:30:00', '2023-07-24', '15:00:00', 130, 190.00),
  ('Philippine Airlines', 'Manila', 'Singapore', '2023-07-25', '09:30:00', '2023-07-25', '11:00:00', 100, 140.00),
  ('LOT Polish Airlines', 'Warsaw', 'Berlin', '2023-07-25', '12:00:00', '2023-07-25', '13:30:00', 110, 150.00),
  ('Jet Airways', 'Mumbai', 'Chennai', '2023-07-26', '10:00:00', '2023-07-26', '11:30:00', 120, 180.00),
  ('Aer Lingus', 'Dublin', 'London', '2023-07-26', '14:00:00', '2023-07-26', '15:00:00', 90, 110.00),
  ('Brussels Airlines', 'Brussels', 'Amsterdam', '2023-07-27', '09:00:00', '2023-07-27', '10:00:00', 100, 120.00),
  ('IndiGo', 'Delhi', 'Mumbai', '2023-07-27', '11:30:00', '2023-07-27', '14:00:00', 160, 250.00),
  ('Air Seychelles', 'Mahe', 'Johannesburg', '2023-07-28', '10:30:00', '2023-07-28', '13:00:00', 170, 270.00),
  ('Ethiopian Airlines', 'Addis Ababa', 'Nairobi', '2023-07-28', '13:30:00', '2023-07-28', '15:00:00', 140, 200.00),
  ('Cathay Pacific', 'Hong Kong', 'Singapore', '2023-07-29', '09:30:00', '2023-07-29', '11:00:00', 120, 170.00),
  ('Air Mauritius', 'Port Louis', 'Johannesburg', '2023-07-29', '12:00:00', '2023-07-29', '14:00:00', 150, 240.00),
  ('TUI Airways', 'London', 'Palma de Mallorca', '2023-07-30', '10:00:00', '2023-07-30', '12:00:00', 130, 180.00),
  ('Air Astana', 'Almaty', 'Astana', '2023-07-30', '14:30:00', '2023-07-30', '15:30:00', 110, 140.00);



-- Crear la tabla de reservas
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  flight_id INTEGER REFERENCES flights (id),
  passenger_identification VARCHAR(20) NOT NULL,
  passenger_name VARCHAR(255) NOT NULL,
  passenger_email VARCHAR(255) NOT NULL,
  passenger_phone VARCHAR(20) NOT NULL,
  passenger_qty_reservation INTEGER DEFAULT 1 
);