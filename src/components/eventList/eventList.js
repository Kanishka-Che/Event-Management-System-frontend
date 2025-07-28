import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './eventList.css';



function EventList({ onView }) {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events');
    setEvents(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
  <div className="event-container">
    <h2 className="event-title">Upcoming Events</h2>
    <ul className="event-list">
      {events.map(event => (
        <li key={event.id} className="event-item">
          <div className="event-info">
            <h3 className="event-name">{event.name}</h3>
            <p className="event-date">{event.date}</p>
          </div>
          <div className="event-buttons">
            <button className="btn update" onClick={() => onView(event.id)}>Update</button>
            <button className="btn delete" onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

}

export default EventList;
