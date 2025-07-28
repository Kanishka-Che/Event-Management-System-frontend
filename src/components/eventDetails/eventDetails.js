import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './eventDetails.css';

function EventDetails({ eventId }) {
  const [event, setEvent] = useState(null);
  const [attendee, setAttendee] = useState('');
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    if (eventId) {
      axios.get(`http://localhost:5000/api/events/${eventId}`).then(res => setEvent(res.data));
      axios.get(`http://localhost:5000/api/events/${eventId}/attendees`).then(res => setAttendees(res.data));
    }
  }, [eventId]);

  const registerAttendee = async () => {
    await axios.post(`http://localhost:5000/api/events/${eventId}/attendees`, { name: attendee });
    setAttendee('');
    const res = await axios.get(`http://localhost:5000/api/events/${eventId}/attendees`);
    setAttendees(res.data);
  };

  if (!event)  {
  return (
    <div className="no-event">
      <p className="no-event-text">Please select an event to view its details.</p>
    </div>
  );
}

  return (
  <div className="event-details">
    <h2 className="event-title">{event.name}</h2>
    <p className="event-description">{event.description}</p>
    <p className="event-info"><strong>Date:</strong> {event.date}</p>
    <p className="event-info"><strong>Location:</strong> {event.location}</p>

    <h3 className="attendee-title">Attendees</h3>
    <ul className="attendee-list">
      {attendees.map(a => <li key={a.id} className="attendee-item">{a.name}</li>)}
    </ul>

    <div className="attendee-form">
      <input
        value={attendee}
        onChange={e => setAttendee(e.target.value)}
        placeholder="Attendee Name"
        className="attendee-input"
      />
      <button onClick={registerAttendee} className="attendee-button">Register</button>
    </div>
  </div>
);

}
export default EventDetails;
