import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './eventForm.css';

function EventForm({ onEventAdded, eventData, clearSelected }) {
  const [event, setEvent] = useState({ name: '', description: '', date: '', location: '' });

  
  useEffect(() => {
    if (eventData) {
      setEvent(eventData);
    }
  }, [eventData]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (event.id) {
        
        await axios.put(`http://localhost:5000/api/events/${event.id}`, event);
      } else {
        
        await axios.post('http://localhost:5000/api/events', event);
      }

      setEvent({ name: '', description: '', date: '', location: '' });
      onEventAdded();
      clearSelected(); 
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
  <h2 className="form-title">{event.id ? 'Edit Event' : 'Add New Event'}</h2>
  
  <input
    className="form-input"
    name="name"
    placeholder="Event Name"
    value={event.name}
    onChange={handleChange}
  />
  <input
    className="form-input"
    name="description"
    placeholder="Description"
    value={event.description}
    onChange={handleChange}
  />
  <input
    className="form-input"
    type="date"
    name="date"
    value={event.date}
    onChange={handleChange}
  />
  <input
    className="form-input"
    name="location"
    placeholder="Location"
    value={event.location}
    onChange={handleChange}
  />

  <div className="form-buttons">
    <button type="submit" className="form-button submit">
      {event.id ? 'Update Event' : 'Add Event'}
    </button>
    {event.id && (
      <button
        type="button"
        onClick={() => {
          setEvent({ name: '', description: '', date: '', location: '' });
          clearSelected();
        }}
        className="form-button cancel"
      >
        Cancel
      </button>
    )}
  </div>
</form>

  );
}

export default EventForm;
