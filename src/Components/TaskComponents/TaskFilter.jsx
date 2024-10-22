import React, { useState, useEffect } from "react";
import "./TaskFilter.css";

const GROUP_OPTIONS = ["Status", "User", "Priority"];
const ORDER_OPTIONS = ["Priority", "Title"];

const TaskFilter = ({ setDisplayTasks, tickets, users }) => {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(GROUP_OPTIONS[0]);
  const [selectedOrder, setSelectedOrder] = useState(ORDER_OPTIONS[0]);

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
  };

  useEffect(() => {
    if (tickets) {
      const groupedAndOrderedTickets = groupAndOrderTickets(
        tickets,
        selectedGroup,
        selectedOrder, 
        users
      );
      setDisplayTasks(groupedAndOrderedTickets);
    }
  }, [selectedGroup, selectedOrder, tickets]);

  // Function to group and order tickets
  const groupAndOrderTickets = (tickets, groupBy, orderBy, users) => {
    // Create a mapping from userId to userName
    const userMapping = users.reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});

    // Define the mapping between groupBy options and the corresponding fields in the ticket object
    const groupKeyMapping = {
      Status: "status",
      User: "userId",
      Priority: "priority",
    };

    // Use the correct field based on groupBy
    const groupField = groupKeyMapping[groupBy];

    // Grouping logic
    console.log("This is tickets => ", tickets);
    const groupedTickets = tickets.reduce((acc, ticket) => {
      let groupKey = ticket[groupField]; // e.g., status, userId, or priority

      // If grouping by user, replace userId with the user name
      if (groupBy === "User") {
        groupKey = userMapping[groupKey] || "Unknown User"; // Replace userId with user name
      }

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(ticket);
      return acc;
    }, {});

    // Sorting each group
    Object.keys(groupedTickets).forEach((groupKey) => {
      groupedTickets[groupKey].sort((a, b) => {
        if (orderBy === "Priority") {
          return a.priority - b.priority;
        } else if (orderBy === "Title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    console.log(groupedTickets);
    return groupedTickets;
  };

  return (
    <div className="task-filter">
      {/* Main Display Dropdown */}
      <div className="dropdown">
        <button
          className="dropdown-btn"
          onClick={() => setIsDisplayOpen(!isDisplayOpen)}
        >
          <span className="icon">⚙️</span> Display
        </button>

        {isDisplayOpen && (
          <div className="dropdown-panel">
            <div className="dropdown-section">
              <label>Grouping</label>
              <select
                value={selectedGroup}
                onChange={(e) => {
                  handleGroupChange(e.target.value);
                }}
              >
                {GROUP_OPTIONS.map((ele, index) => {
                  return <option key={index}>{ele}</option>;
                })}
              </select>
            </div>

            <div className="dropdown-section">
              <label>Ordering</label>
              <select
                value={selectedOrder}
                onChange={(e) => {
                  handleOrderChange(e.target.value);
                }}
              >
                {ORDER_OPTIONS.map((ele, index) => {
                  return <option key={index}>{ele}</option>;
                })}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilter;
