import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import AddTaskButton from "./AddTaskButton";

export default function NoTasks({title, text1, text2, icon, showAddTask}) {
  const {mode} = useSelector(state => state.theme)

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{height: "65vh"}}>
      <div className="bg-secondary-subtle rounded-circle d-flex align-items-center justify-content-center mb-3"
      style={{ width: "80px", height: "80px" }}>
  <FontAwesomeIcon icon={icon} className="text-secondary fs-1"/>
   </div>
      <h3 className={`fw-bold ${mode === 'dark' ? 'text-warning' : 'text-dark'}`}>{title}</h3>
      <p className="mb-0">{text1}</p>
      <p>{text2}</p>
      { showAddTask && <AddTaskButton text={"Creat Your First Task"} />}
    </div>
  )
}
