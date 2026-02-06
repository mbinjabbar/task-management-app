import TitleBar from "../components/TitleBar";
import TaskList from "../components/Task/TaskList";
import AddTaskButton from "../components/Task/AddTaskButton";
import ThemeToggleButton from "../components/ThemeToggleButton";

export default function Tasks() {

  return (
    <>
      <TitleBar text={"ALL TASKS"} icon={"clipboard-list"} />
      <div className="d-sm-none d-flex justify-content-center mb-3">
      <AddTaskButton text={"ADD TASK"} />
      <ThemeToggleButton />
      </div>
      <TaskList showAddTask={true}
      emptyState={{
          title: "No Tasks Yet",
          text1: "Start by creating your first task",
          text2: "Stay organized and track your progress",
          icon: "clipboard-list",
      }} />
    </>
  );
}
