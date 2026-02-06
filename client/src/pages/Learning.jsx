import TitleBar from "../components/TitleBar";
import TaskList from "../components/Task/TaskList";
import { category } from "../components/helper/categoriesTitles";

export default function Learning() {

  return (
    <>
      <TitleBar text={"LEARNING"} icon={"graduation-cap"} />
        <TaskList category={category.learning} 
        emptyState={{
          title: "Learning",
          text1: "No learning tasks added yet.",
          text2: "Start adding topics or skills you want to improve.",
          icon: "graduation-cap"
        }}
        />
    </>
  );
}
