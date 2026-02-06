import TitleBar from "../components/TitleBar";
import TaskList from "../components/Task/TaskList";
import { category } from "../components/helper/categoriesTitles";

export default function Personal() {

  return (
    <>
      <TitleBar text={"PERSONAL"} icon={"user-plus"} />
        <TaskList category={category.personal}
        emptyState={{
          title: "Personal",
          text1: "No personal tasks added yet.",
          text2: "Add reminders to manage your daily life better.",
          icon: "user-plus"
          }}
        />
    </>
  );
}