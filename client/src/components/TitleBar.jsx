import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TitleBar({text, icon}) {
  const { mode } = useSelector(state => state.theme);
  const modeToggle = mode === "light" ? "text-primary bg-white" : "bg-info text-dark";

  return (
    <Container>
    <div className={`w-100 shadow-sm rounded p-2 p-sm-3 p-md-4 my-4 ${modeToggle}`}>
        <FontAwesomeIcon icon={icon} className="me-2"/><span>{text}</span>
    </div>
    </Container>
  )
}
