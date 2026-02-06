import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCredentials } from "../../app/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [show, setShow] = useState(false);
  const { mode } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  async function handleLogin() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      dispatch(setCredentials({ token: data.token, user: data.user }));

      setShow(false);
      navigate("/tasks");
    } catch (err) {
      toast.error("Server error. Please try again.", {theme: "colored"})
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant={mode === "light" ? "outline-primary" : "outline-light"}
        className="fw-semibold me-3"
        onClick={() => setShow(true)}
      >
        LOGIN
      </Button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header className={mode === "light" ? "bg-primary" : ""}>
          <Modal.Title className="text-white fs-5">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`p-4 ${mode === "light" ? "" : "bg-dark-subtle"}`}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type="email"
                placeholder="Email"
                className="p-3"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
              <Form.Label className="position-absolute top-0 mt-3 end-0 me-3 text-secondary">
                @gmail.com
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Password"
                className="p-3"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
              {error && (
                <Form.Text className="text-danger">{error}</Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant={mode === "light" ? "" : ""}
                className="border-0 fw-semibold me-2"
                onClick={() => setShow(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant={mode === "light" ? "primary" : "light"}
                className="fw-semibold"
                type="submit"
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}