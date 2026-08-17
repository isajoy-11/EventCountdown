import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import EventForm from "../components/EventForm";
import Countdown from "../components/Countdown";
import EditEvent from "../components/EditEvent";

import "./Dashboard.css";

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    // Get events
    useEffect(() => {
        const getEvents = async () => {
            try {
                const response = await api.get("events/");
                setEvents(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getEvents();
    }, []);

    // Logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Delete event
    const deleteEvent = async (id) => {
        try {
            await api.delete(`events/${id}/`);

            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== id)
            );
        } catch (error) {
            console.log(error);
            alert("Could not delete event");
        }
    };

    // Add event
    const handleEventAdded = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    // Update event
    const handleEventUpdated = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id
                    ? updatedEvent
                    : event
            )
        );

        setEditingEvent(null);
    };

    return (
        <div className="dashboard">

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1>Event Countdown</h1>
                    <p>Keep track of your important events ⏳</p>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Add Event */}
            <div className="event-form">
                <EventForm onEventAdded={handleEventAdded} />
            </div>

            {/* Events */}
            <h2>My Events</h2>

            {events.length === 0 ? (
                <p>No events yet. Add your first event!</p>
            ) : (
                <div className="events-grid">

                    {events.map((event) => (
                        <div className="event-card" key={event.id}>

                            {editingEvent?.id === event.id ? (

                                <EditEvent
                                    event={event}
                                    onUpdated={handleEventUpdated}
                                    onCancel={() =>
                                        setEditingEvent(null)
                                    }
                                />

                            ) : (

                                <>
                                    <h3>{event.title}</h3>

                                    <div className="countdown">
                                        <Countdown
                                            targetDate={event.target_date}
                                        />
                                    </div>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            setEditingEvent(event)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteEvent(event.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </>

                            )}

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default Dashboard;