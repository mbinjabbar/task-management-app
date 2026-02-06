import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { toast } from "react-toastify";
import { updateTask } from "../../app/taskSlice";
import { updateTaskApi } from "../api/taskApi";

export default function TaskCard({ task, onDelete, onToggleFavorite }) {
  const { mode } = useSelector((state) => state.theme);

  const [showEdit, setShowEdit] = useState(false);
  const [isFav, setIsFav] = useState(task.isFavorite);
  const dispatch = useDispatch();
  const categoryColor = task.category.color;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleFavoriteClick = () => {
    setIsFav(prev => !prev);
    onToggleFavorite(task._id)
  }

  const handleUpdate = async (updatedData) => {
  try {
    const updatedTask = await updateTaskApi(task._id, updatedData);

    dispatch(updateTask(updatedTask));
    toast.success("Task Updated", { theme: "colored" });
    setShowEdit(false);
  } catch (err) {
    toast.error(err.message, { theme: "colored" });
  }
};


  return (
    <>
      <Card className="shadow-sm h-100 position-relative">
        <span className="card-badge" style={{
            position: "absolute",
            left: 0,
            top: 25,
            width: "4px",
            height: "75px",
            backgroundColor: categoryColor,
            borderRadius: "0 3px 3px 0",
          }}
        />
        <Card.Body className="p-3 p-sm-4 d-flex flex-column">
          <Card.Title
            className={`text-capitalize mb-3 mb-sm-4 fs-4 text-break ${mode === "dark" ? "text-info" : ""}`}
          >
            {task.title}
          </Card.Title>
          <Row className="g-4">
            <Col>
              <Card.Text className="mb-2 mb-sm-4">
                <FontAwesomeIcon
                  icon="calendar"
                  className="me-2"
                  style={{ color: `${categoryColor}` }}
                />
                <span className="d-inline-block">{formatDate(task.date)}</span>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className="mb-4">
                <FontAwesomeIcon
                  icon="clock"
                  className="me-2"
                  style={{ color: `${categoryColor}` }}
                />
                <span className="d-inline-block">{formatTime(task.time)}</span>
              </Card.Text>
            </Col>
          </Row>
          <Card.Text className="text-muted ms-1 mb-4 flex-grow-1 text-break">
            {task.description}
          </Card.Text>
          <Row className="g-4">
            <Col>
              <Card.Text className="mb-2 mb-sm-3">
                <FontAwesomeIcon
                  icon="spinner"
                  className="me-2"
                  style={{ color: `${categoryColor}` }}
                />
                <span className="fw-semibold me-2">Progress:</span>
                <span className="d-inline-block">{task.progress}%</span>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className="mb-2 mb-sm-3 text-capitalize">
                <FontAwesomeIcon
                  icon={task.status.icon}
                  className="me-2"
                  style={{ color: `${categoryColor}` }}
                />
                <span className="fw-semibold me-2">Status:</span>
                <span className="d-inline-block text-break">{task.status.name}</span>
              </Card.Text>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
            <div className="d-flex gap-3">
              <Button
                variant="link"
                className="btn-hover p-2 text-primary"
                onClick={() => setShowEdit(true)}
              >
                <FontAwesomeIcon icon="pencil" />
              </Button>
              <Button
                variant="link"
                className="btn-hover p-2 text-danger"
                onClick={() => onDelete(task._id)}
              >
                <FontAwesomeIcon icon="trash" />
              </Button>
            </div>
            <div>
              <Button
                variant="link"
                className="btn-hover p-2 text-warning"
                onClick={handleFavoriteClick}
              >
                <FontAwesomeIcon
                  icon={isFav ? "star" : ["far", "star"]}
                />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <TaskFormModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        onSubmit={handleUpdate}
        initialData={task}
      />
    </>
  );
}