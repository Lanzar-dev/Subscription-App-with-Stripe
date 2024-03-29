import { useState, useContext } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const ErrorMessage = styled.p`
  color: red;
`;

export default function ModalComponent({ text, variant, isSignupFlow }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let res;
    if (isSignupFlow) {
      const { data: SignupData } = await axios.post("/auth/signup", {
        email,
        password,
      });
      res = SignupData;
    } else {
      const { data: loginData } = await axios.post("/auth/login", {
        email,
        password,
      });
      res = loginData;
    }

    if (res.errors.length) {
      return setErrorMsg(res.errors[0].msg);
    }

    setUser({
      data: {
        id: res.data.user.id,
        email: res.data.user.email,
        stripeCustomerId: res.data.user.stripeCustomerId,
      },
      loading: false,
      error: null,
    });

    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["authorization"] = `Bearer ${res.data.token}`;
    navigate("/articles");
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.5rem 3rem" }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
