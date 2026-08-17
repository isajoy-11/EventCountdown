import { useState } from "react";
import api from "../api/axios";

function EventForm({ onEventAdded }) {
    const [title, setTitle] = useState("");
    const [targetDate, setTargetDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("events/", {
                title: title,
                target_date: new Date(targetDate).toISOString(),
            });

            onEventAdded(response.data);

            setTitle("");
            setTargetDate("");
        } catch (error) {
            console.log(error);
            alert("Could not create event");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Event</h2>

            <input
                type="text"
                placeholder="Event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <br /><br />

            <input
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
            />

            <br /><br />

            <button type="submit">
                Add Event
            </button>
        </form>
    );
}

export default EventForm;