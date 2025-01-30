import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./admincalendar.css";
import axios from "axios";
import AdminDashboard from "../AdminDashboard";
import AdminNavbar from "../Navbar/AdminNavbar";
import { toast } from "react-toastify";

// const apiUrl = "http://localhost:5000";

const AdminCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    time: "",
    notification: false,
  });
  const [events, setEvents] = useState([]);

  // Fetch events when date changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${date.toISOString().split("T")[0]}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, [date]); // Re-fetch events whenever date changes

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const toastOptions = {
    toastId: "admin-login", // Unique ID to prevent duplicate toasts
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000,
    draggable: true,
    theme: "light",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSaveEvent = async () => {
    try {
      const eventData = {
        ...eventDetails,
        date: date.toISOString().split("T")[0], // format date to YYYY-MM-DD
      };

      // Send the event data to your backend
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, eventData);
      toast.success("Event created successfully!", toastOptions);

      // Re-fetch events after saving a new one
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${date.toISOString().split("T")[0]}`);
      setEvents(response.data);
    } catch (error) {
      toast.error("Error creating event!", toastOptions);
    }
  };

  // Function to display events inside each date box
  const tileContent = ({ date, view }) => {
    // Find events for the specific date
    const eventsOnThisDate = events.filter(
      (event) => event.date === date.toISOString().split("T")[0]
    );

    return (
      <div className="tile-content">
        {eventsOnThisDate.length > 0 &&
          eventsOnThisDate.map((event) => (
            <div key={event._id} className="event-on-date">
              <span className="event-title">{event.title}</span>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <AdminDashboard />
      <AdminNavbar />
      <div className="calendar-container">
        <h1>Admin Calendar</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          className="calendar" // Add a class for calendar
        />
        <div className="event-input-container">
          <h3>Create Event</h3>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventDetails.title}
            onChange={handleInputChange}
            className="event-input" // Added className
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventDetails.description}
            onChange={handleInputChange}
            className="event-textarea" // Added className
          />
          <input
            type="time"
            name="time"
            value={eventDetails.time}
            onChange={handleInputChange}
            className="event-time" // Added className
          />
          <button onClick={handleSaveEvent} className="save-event-button">Save Event</button>
        </div>

        <div className="events-list">
          <h3>Events for {date.toISOString().split("T")[0]}</h3>
          {events.length === 0 ? (
            <p>No events for this date.</p>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event._id} className="event-list-item">
                  <strong>{event.title}</strong>
                  <p>{event.description}</p>
                  <p>{event.time}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCalendar;


