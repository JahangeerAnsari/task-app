import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import InputField from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useHistory } from "react-router-dom";

/**
 * @author
 * @function Signin
 **/

export const Signin = (props) => {
  const users = JSON.parse(localStorage.getItem("results"));
  const [user, setUser] = useState({ userName: "", password: "" });
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  const onSubmitSiginForm = (e) => {
    e.preventDefault();

    let isValidated = false;
    let userData = {};
    users.forEach((u) => {
      if (u.userName === user.userName || u.email === user.userName) {
        isValidated = true;
        userData = u;
      }
    });
    if (isValidated) {
      localStorage.setItem("user", JSON.stringify({ ...userData, ...user }));
      setAlert({
        ...alert,
        message: "User Signin  success",
        variant: "success",
      });
      setShowAlert(true);

      history.push("/");
    } else {
      //error wrong credentials
      setAlert({ ...alert, message: "Invalid Input", variant: "danger" });

      setShowAlert(true);
    }
    // if()
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((old) => ({ ...old, [id]: value }));
  };

  return (
    <Layout>
      <Container style={{ paddingTop: "50px" }}>
        {showAlert && (
          <Alert
            variant={alert.variant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
        <Row>
          <Col md={{ span: "6", offset: "3" }}>
            <Form onSubmit={onSubmitSiginForm}>
              <InputField
                id="userName"
                label="UserName/Email"
                type="text"
                value={user.userName}
                placeholder="Enter username/email"
                onChange={handleChange}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
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
