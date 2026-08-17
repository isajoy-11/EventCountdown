import { useState } from "react";
import api from "../api/axios";

function EditEvent({ event, onUpdated, onCancel }) {
    const [title, setTitle] = useState(event.title);

    const [targetDate, setTargetDate] = useState(
        new Date(event.target_date).toISOString().slice(0, 16)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(`events/${event.id}/`, {
                title: title,
                target_date: new Date(targetDate).toISOString(),
            });

            onUpdated(response.data);
        } catch (error) {
            console.log(error);
            alert("Could not update event");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <input
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
            />

            <button type="submit">Save</button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default EditEvent;