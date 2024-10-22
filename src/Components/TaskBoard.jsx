import axios from "axios";
import { useEffect, useState } from "react";
import TaskFilter from "./TaskComponents/TaskFilter";
import TaskDisplay from "./TaskComponents/TaskDisplay";
const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";
const TaskBoard = () => {
  const [fetchedTask, setFetchedTask] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [displayTasks, setDisplayTasks] = useState([]);
  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data.tickets);
    console.log(response.data.users);
    setFetchedTask(response.data.tickets);
    setFetchedUsers(response.data.users);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      {fetchedTask.length > 0 && fetchedUsers.length > 0 ? (
        <>
          <TaskFilter
            tickets={fetchedTask}
            setDisplayTasks={setDisplayTasks}
            users={fetchedUsers}
          />
          <TaskDisplay tasks={displayTasks} />
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
export default TaskBoard;
