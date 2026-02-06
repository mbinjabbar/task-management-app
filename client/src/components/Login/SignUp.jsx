import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SignUp() {
  const [ show, setShow ] = useState(false);
  const fileInputRef = useRef();
  const { mode } = useSelector(state => state.theme);
  
  const [ user, setUser ] = useState({
    name: { value: "", message: ""},
    email: { value: "", message: ""},
    password: { value: "", message: ""},
    contact: { value: "", message: ""},
    image: {value: null}
  })

  const handleName = (e) => {
    const temp = e.target.value;
    if(temp){
        setUser(prev => ({
            ...prev, name:{value: temp, message: ""}
        }))
        return true;
    }
    setUser(prev => ({
            ...prev, name:{value: "", message: ""}
    }))
    return false;
  }

  const handleEmail = (e) => {
    const temp = e.target.value;
    if(temp){
        setUser(prev => ({
            ...prev, email:{value: temp, message: ""}
        }))
        return true;
    }
    setUser(prev => ({
            ...prev, email:{value: "", message: ""}
    }))
    return false;
  }

  const handlePassword = (e) => {
    const temp = e.target.value;
    if(temp){
        setUser(prev => ({
            ...prev, password:{value: temp, message: ""}
        }))
        return true;
    }
    setUser(prev => ({
            ...prev, password:{value: "", message: ""}
    }))
    return false;
  }

  const handleContact = (e) => {
    const temp = e.target.value;
    if(temp){
        setUser(prev => ({
            ...prev, contact:{value: temp, message: ""}
        }))
        return true;
    }
    setUser(prev => ({
            ...prev, contact:{value: "", message: ""}
    }))
    return false;
  }

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    if(imageFile) {
        setUser(prev => ({
            ...prev, image: {value: imageFile}
        }))
    }
  }

  const handleDismissImage = () => {
    setUser(prev => ({
            ...prev, image: {value: null}
    }))

    if (fileInputRef.current) {
    fileInputRef.current.value = "";
   }
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  let isValid = true;

  const updatedUser = { ...user };

  if (!user.name.value) {
    updatedUser.name.message = "Required";
    isValid = false;
  }

  if (!user.email.value) {
    updatedUser.email.message = "Required";
    isValid = false;
  }

  if (!user.password.value) {
    updatedUser.password.message = "Required";
    isValid = false;
  }

  if (!user.contact.value) {
    updatedUser.contact.message = "Required";
    isValid = false;
  }

  setUser(updatedUser);

  if (!isValid) return;

  const formData = new FormData();
  formData.append("name", user.name.value);
  formData.append("email", user.email.value);
  formData.append("password", user.password.value);
  formData.append("contact", user.contact.value);
  formData.append("image", user.image.value);

  try{
    const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: formData
    })

    const data = await res.json();
    if (!res.ok) {
    toast.error(data.message || "Something went wrong!", {theme: "colored"})
    } else {
      toast.success("Account created successfully!", { theme: "colored" });
      setShow(false);
      setUser({
        name: { value: "", message: "" },
        email: { value: "", message: "" },
        password: { value: "", message: "" },
        contact: { value: "", message: "" },
        image: { value: null },
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  } catch(err){
    toast.warning("Server error. Try again later!", {theme: "colored"});
    console.log(err)
  }
};
  
  return (
    <>
    <Button className="fw-semibold" onClick={()=> setShow(true)}>SIGNUP</Button>
    <Modal show={show} onHide={()=> setShow(false)} centered>
        <Modal.Header className={mode === 'light' ? 'bg-primary' : ''}>
            <Modal.Title className="text-white fs-5">Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`p-4 ${mode === "light" ? "" : "bg-dark-subtle"}`}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Full Name" className="p-3" onChange={handleName}/>
                    <Form.Text className="text-danger">{user.name.message}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 position-relative">
                    <Form.Control type="email" placeholder="Email" className="p-3" onChange={handleEmail}/>
                    <Form.Label className="position-absolute top-0 mt-3 end-0 me-3 text-secondary">@gmail.com</Form.Label>
                    <Form.Text className="text-danger">{user.email.message}</Form.Text>
                </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                    <Col>
                    <Form.Control type="password" placeholder="Password" className="p-3" onChange={handlePassword}/>
                    <Form.Text className="text-danger">{user.password.message}</Form.Text>
                    </Col>
                    <Col>
                    <Form.Control type="text" placeholder="Contact" className="p-3" onChange={handleContact}/>
                    <Form.Text className="text-danger">{user.contact.message}</Form.Text>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Control type="file" ref={fileInputRef} className="d-none" onChange={handleImage} />
                { !user.image.value ? (
                <Button className="fw-semibold" onClick={()=> fileInputRef.current.click()}
                ><FontAwesomeIcon icon="cloud-upload" className="me-2"/>Upload Image</Button>
                ) : 
                (<Form.Text className="text-success small fw-semibold">Image Selected
                <button className="btn border-0 p-0 text-muted" onClick={handleDismissImage}>
                <FontAwesomeIcon icon="far fa-circle-xmark" className="ms-1" />
                </button></Form.Text>)
                }
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer className={`border-0 p-4 pt-0 ${mode === "light" ? "" : "bg-dark-subtle"}`}>
            <Button variant={mode === "light" ? "" : ""} className="border-0 fw-semibold" onClick={()=> setShow(false)}>Cancel</Button>
            <Button variant={mode === "light" ? "primary" : "light"} className="fw-semibold" onClick={handleSubmit}>
            <FontAwesomeIcon icon="save" className="me-1"/>Signup</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}