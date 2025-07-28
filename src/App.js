import React, { useState, useEffect } from 'react';
import EventForm from './components/eventForm/eventForm';
import EventList from './components/eventList/eventList';
import EventDetails from './components/eventDetails/eventDetails';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  useEffect(() => {
    if (selectedId) {
      axios.get(`http://localhost:5000/api/events/${selectedId}`)
        .then(res => setSelectedEvent(res.data))
        .catch(err => console.error('Failed to load event for editing', err));
    }
  }, [selectedId]);

  const clearSelectedEvent = () => {
    setSelectedId(null);
    setSelectedEvent(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Event Management System</h1>
      </header>

      <main className="app-main">
        <div className="form-section">
          <EventForm
            onEventAdded={triggerRefresh}
            eventData={selectedEvent}
            clearSelected={clearSelectedEvent}
          />
        </div>

        <div className="list-section">
          <EventList onView={setSelectedId} key={refresh} />
        </div>

        <div className="details-section">
          <EventDetails eventId={selectedId} />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Event Manager App</p>
      </footer>
    </div>
  );
}

export default App;
