import React from 'react';
import './TaskCard.css'; // Assuming you're using CSS for styling

const TaskCard = ({ ticket }) => {
    return (
        <div className="ticket">
            <div className="ticket-title">
                <strong>{ticket.title}</strong>
            </div>
            <div className="ticket-tags">
                {ticket.tag.map((t, index) => (
                    <span key={index} className="ticket-tag">{t}</span>
                ))}
            </div>
            <div className="ticket-priority">
                Priority: {ticket.priority}
            </div>
        </div>
    );
};

export default TaskCard;
