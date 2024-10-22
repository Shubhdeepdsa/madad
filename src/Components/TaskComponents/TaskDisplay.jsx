import TaskColumn from "./TaskColumn";
import './TaskDisplay.css'
const TaskDisplay = ({ tasks }) => {
  console.log("This is the display section logs => ", tasks);
  return (
    <div className="kanban-board">
      {Object.keys(tasks).map((column) => (
        <TaskColumn key={column} title={column} tasks={tasks[column]} />
      ))}
    </div>
  );
};

export default TaskDisplay;
