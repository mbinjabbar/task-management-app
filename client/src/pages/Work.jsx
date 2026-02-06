import TitleBar from "../components/TitleBar"
import TaskList from "../components/Task/TaskList"
import { category } from "../components/helper/categoriesTitles"

export default function Work() {

  return (
    <>
      <TitleBar text={"WORK"} icon={"briefcase"} />
      <TaskList category={category.work}
      emptyState={{
                title: "Work",
                text1: "No work tasks added yet.",
                text2: "Start planning your work to stay productive.",
                icon: "briefcase",
      }}
      />
    </>
  )
}