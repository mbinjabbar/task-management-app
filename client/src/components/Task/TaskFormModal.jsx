import { Modal, Button, Nav, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import BasicForm from "./BasicForm";
import MoreForm from "./MoreForm";

export default function TaskFormModal({ show, handleClose, onSubmit, initialData = null }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [taskData, setTaskData] = useState({
    title: "",
    date: "",
    time: "",
    category: "",
    status: "to do",
    progress: 0,
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setTaskData(initialData);
    }
  }, [initialData]);

  const resetState = () => {
    setActiveTab("basic");
    handleClose();

    if (!initialData) {
      setTaskData({
        title: "",
        date: "",
        time: "",
        category: "",
        status: "to do",
        progress: 0,
        description: "",
      });
    }
  };

  const handleSubmit = () => {
    onSubmit(taskData);

    if (!initialData) {
      setTaskData({
        title: "",
        date: "",
        time: "",
        category: "",
        status: "to do",
        progress: 0,
        description: "",
      });
    }

    setActiveTab("basic");
    handleClose();
  };

  return (
    <Modal show={show} onHide={resetState} centered>
      <Modal.Header className="bg-primary text-white">
        <h5 className="mb-0">Task Details</h5>
      </Modal.Header>

      <Modal.Body>
        <Nav
          variant="underline"
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="mb-4 d-flex flex-row"
        >
          <Nav.Item style={{ width: "75px" }} className="text-center">
            <Nav.Link eventKey="basic">BASIC</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ width: "75px" }} className="text-center">
            <Nav.Link eventKey="more">MORE</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form className="mx-2">
          {activeTab === "basic" && (
            <BasicForm formData={taskData} setFormData={setTaskData} />
          )}
          {activeTab === "more" && (
            <MoreForm formData={taskData} setFormData={setTaskData} />
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pb-4 pt-0 mx-2">
        <Button variant="" className="border-0 fw-semibold" onClick={resetState}>
          CANCEL
        </Button>

        {activeTab === "basic" ? (
          <Button className="fw-semibold" onClick={() => setActiveTab("more")}>
            NEXT
          </Button>
        ) : (
          <Button className="fw-semibold" onClick={handleSubmit}>
            <FontAwesomeIcon
              icon={initialData ? "pen-to-square" : "save"}
              className="me-1"
            />
            {initialData ? "UPDATE" : "SUBMIT"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}