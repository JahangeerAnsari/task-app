import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import api from "../../api/index";
import "./style.css";
import { Alert, Col, Row, Table } from "react-bootstrap";
import NewModal from "../../components/Modal";
import InputField from "../../components/InputField";
import Button from "@restart/ui/esm/Button";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("");
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const getAllUser = async () => {
    try {
      const response = await api.get("/users?");
      if (response && response.data) {
        const { data } = response;
        setUsers(data.data || []);
      }
    } catch (e) {
      setAlert({
        ...alert,
        message: "Failed to fetch the users list",
        variant: "danger",
      });
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const showModal = (_user) => {
    if (_user) {
      setAction("updateUser");
      setUser(_user);
    } else {
      setAction("addUser");
    }
    setShow(true);
  };

  // close
  const closeModal = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const renderModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={closeModal}
        modalTitle={`USER DETAILS`}
        size="lg"
        buttonText={action === "addUser" ? "Add user" : "Save changes"}
        onSubmit={action === "addUser" ? addUser : updateUser}
      >
        <Row>
          <Col md="6">
            <InputField
              label="First Name"
              id="first_name"
              placeholder="first name"
              value={user.first_name}
              onChange={handleChange}
            />
          </Col>
          <Col md="6">
            <InputField
              id="last_name"
              label="Last Name"
              placeholder="last name"
              value={user.last_name}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <InputField
              id="email"
              label="Email"
              placeholder="email"
              value={user.email}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </NewModal>
    );
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (user.id) {
        const response = await api.patch(`/users/${user.id}`, user);
        if (response.status === 200) {
          setAlert({
            ...alert,
            message: "update has been success",
            variant: "success",
          });
          setShowAlert(true);
        }

        closeModal();
        const updatedUser = response.data;
        if (updatedUser) {
          const newUsers = users.map((u) => {
            if (u.email === updatedUser.email) {
              return updatedUser;
            }
            return u;
          });
          setUsers(newUsers);
        }
      }
    } catch (error) {
      if (error.status === 400) {
        setAlert({
          ...alert,
          message: "Sonething went wrong",
          variant: "danger",
        });

        setShowAlert(true);
      }
    }
  };

  // update user has been completed

  // add user

  const addUser = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        const response = await api.patch(`/users/`, user);
        const savedUser = response.data;
        if (savedUser) {
          const otherUsers = users.filter((u) => u.email !== savedUser.email);
          setUsers([
            ...otherUsers,
            { ...savedUser, id: otherUsers.length + 1 },
          ]);
          setUser({});
          closeModal();
          setAlert({
            ...alert,
            message: "User added successfully!",
            variant: "success",
          });
          setShowAlert(true);
        }
      }
    } catch (error) {
      setAlert({
        ...alert,
        message: "User was not added due to \n" + error,
        variant: "danger",
      });
      setShowAlert(true);
    }
  };

  return (
    <Layout header>
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
        <Col>
          <Button onClick={() => showModal()}>Add user</Button>
        </Col>
      </Row>
      <Table
        striped
        bordered
        hover
        style={{ paddingTop: " 40px", fontSize: "12px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.avatar}</td>
              <td onClick={() => showModal(user)}>Update</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {renderModal()}
    </Layout>
  );
};

export default Home;
