import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import InputField from "../../components/InputField";
import { Layout } from "../../components/Layout";

/**
 * @author
 * @function Signup
 **/

export const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  })
  const [showAlert, setShowAlert] = useState(false);

  const onSubmitSignForm = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      userName,
      email,
      password,
      confPassword,
    };
    

    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.length !== "undefined") {
      localStorage.clear();
      localStorage.setItem("results", JSON.stringify([...data, userData]));
      setAlert({ ...alert, message:"User Registeration  success", variant: "success" });
      setShowAlert(true)

    } else {
      localStorage.setItem("results", JSON.stringify([userData]));
      setAlert({ ...alert, message: "Invalid Input", variant: "danger" });

      setShowAlert(true)
    }
  };

  return (
    <Layout>
      <Container style={{ paddingTop: "50px" }}>
        {showAlert && <Alert variant={alert.variant} onClose={() => setShowAlert(false)} dismissible>
      {alert.message}
    </Alert>
    }
        <Row>
          <Col md={{ span: "6", offset: "3" }}>
            <Form onSubmit={onSubmitSignForm}>
              <Row>
                <Col>
                  <InputField
                    label="FistName"
                    type="text"
                    value={firstName}
                    placeholder="Enter first Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <InputField
                    label="LastName"
                    type="text"
                    value={lastName}
                    placeholder="Enter last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <InputField
                label="Email"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="UserName"
                type="text"
                value={userName}
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                label="Conform Password"
                type="password"
                placeholder="Enter conform password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
