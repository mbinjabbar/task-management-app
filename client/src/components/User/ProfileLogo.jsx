import { Dropdown, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileLogo() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const getFirstName = user.name.split(" ")[0] || "user";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    dispatch(logout());
    setShowConfirm(false);
  }

  return (
    <>
      <Dropdown
        show={show}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Dropdown.Toggle as="div" className="profile-toggle">
          <div className="d-flex flex-column align-items-center">
            <img
              src={`http://localhost:5000/${user.image || 'uploads/noimg.jpg'}`}
              alt="user"
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
              }}
            />
            <span className="text-capitalize" style={{ fontSize: "10px" }}>{getFirstName}</span>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate("/profile")}>
            Profile
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item
            onClick={() => setShowConfirm(true)}
            className="text-danger"
          >
            Logout <FontAwesomeIcon icon="right-from-bracket" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="" 
          className="border-0 fw-semibold"          
          onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger"
          className="fw-semibold"          
          onClick={handleLogout}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}