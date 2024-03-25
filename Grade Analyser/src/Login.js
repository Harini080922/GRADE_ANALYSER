import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    function Onlogin() {
        if (email.length === 0) {
            setShow(true);
        } else {
            navigate("/home");
        }
    }

    function changeText(e) {
        setEmail(e.target.value);
    }

    return (
        <div>
            <header className="header1">
                <h1 className="title">Grade Analyser</h1>
            </header>
            <div id='main'>
                <Row>
                    <Col xs={7}>
                        <Toast onClose={() => setShow(false)} show={show} delay={2800} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Login Validation</strong>
                            </Toast.Header>
                            <Toast.Body>Please enter mandatory fields!!</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <div id='content'>
                    <Form>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your Email Id" required onChange={(e) => changeText(e)} />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>
                        <Button id='btn' onClick={Onlogin} variant="primary">Login</Button>{' '}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
