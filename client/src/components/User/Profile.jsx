import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container className="py-5">
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center fw-bold mb-5">Profile</h1>
        <div className="d-flex flex-column flex-sm-row align-items-center gap-4 gap-sm-5 w-100 justify-content-center">
          <div
            className="flex-shrink-0"
            style={{ width: "250px", maxWidth: "80vw", aspectRatio: "1 / 1" }}
          >
            <img
              src={`http://localhost:5000/${user.image || 'uploads/noimg.jpg'}`}
              alt="user"
              className="rounded w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="text-center text-sm-start">
            <div className="mb-3">
              <h5 className="mb-1">Name:</h5>
              <span className="text-muted">{user.name}</span>
            </div>
            <div className="mb-3">
              <h5 className="mb-1">Email:</h5>
              <span className="text-muted">{user.email}</span>
            </div>
            <div>
              <h5 className="mb-1">Contact:</h5>
              <span className="text-muted">{user.contact}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
