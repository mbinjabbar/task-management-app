import TitleBar from "../components/TitleBar";
import TaskList from "../components/Task/TaskList"


export default function Favorite() {

  return (
    <>
      <TitleBar text={"FAVORITE"} icon={"bookmark"} />
      <TaskList favorite={true}
        emptyState={{
          title: "Favorite",
          text1: "You haven’t marked any tasks as favorite yet.",
          text2: "Tap the star icon to keep important tasks handy.",
          icon: "bookmark",
        }} />
    </>
  );
}
