import React from 'react';
import TaskCard from './TaskCard'; // Import the Ticket component
import './TaskColumn.css'; // Assuming you're using CSS for styling

const TaskColumn = ({ title, tasks }) => {
    return (
        <div className="task-column">
            <div className="task-column-title">
                <h2>{title}</h2>
            </div>
            <div className="task-column-content">
                {tasks.map((ticket) => (
                    <TaskCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;
