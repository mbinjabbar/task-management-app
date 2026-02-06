import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTask } from "../../app/taskSlice.js";
import TaskFormModal from "./TaskFormModal";

export default function AddTaskButton({ text }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (taskData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const newTask = await res.json();
      dispatch(addTask(newTask));

      toast.success("New Task Added", { theme: "colored" });
      setShow(false);
    } catch (err) {
      toast.error(err.message, { theme: "colored" });
    }
  };

  return (
    <>
      <Button
        className="fw-semibold d-flex align-items-center justify-content-center"
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon="square-plus" className="me-2 fs-5" />
        <span>{text}</span>
      </Button>

      <TaskFormModal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}