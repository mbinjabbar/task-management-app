import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { getTasks, deleteTask, toggleFavorite } from "../api/taskApi.js";
import Loader from "../loading/Loader";
import NoTasks from "./NoTasks.jsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setTasks,
  deleteTask as deleteTaskAction,
  updateTask,
} from "../../app/taskSlice.js";

export default function TaskList({
  category,
  favorite,
  emptyState,
  showAddTask,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { tasks } = useSelector((state) => state.tasks);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks({ category, favorite });
        dispatch(setTasks(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [category, favorite, dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      dispatch(deleteTaskAction(id));
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setSelectedTaskId(null);
    }
  };

  const handleToggleFavorite = async (taskId) => {
    try {
      const updatedTask = await toggleFavorite(taskId);
      dispatch(updateTask(updatedTask));
    } catch (err) {
      toast.error("Failed to update favorite");
    }
  };

  if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Loader />
    </div>
  );
}

  return (
    <Container>
      <Row>
        {tasks.length === 0 ? (
          <NoTasks {...emptyState} showAddTask={showAddTask} />
        ) : (
          tasks.map((task) => (
            <Col md={12} lg={4} key={task._id} className="mb-4">
              <TaskCard
                task={task}
                onDelete={() => {
                  setSelectedTaskId(task._id);
                  setShowConfirm(true);
                }}
                onToggleFavorite={handleToggleFavorite}
              />
            </Col>
          ))
        )}
      </Row>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant=""
            className="border-0 fw-semibold"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="fw-semibold"
            onClick={() => handleDelete(selectedTaskId)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
