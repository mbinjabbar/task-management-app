import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function WelcomeUI() {
  const {mode} = useSelector(state => state.theme)
  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center" style={{height: "80vh"}}>
      <FontAwesomeIcon 
        icon="list-check" 
        className="text-primary fs-1 mb-3"
      />

      <h1 className={`fw-bold display-5 mb-0`}>TASK MANAGEMENT APP</h1>

      <p className={`fs-5 mt-2 ${mode === 'light' ? '' : 'text-warning'}`}>
        Organize your tasks, stay focused, and build discipline.
      </p>
    </div>
  );
}
