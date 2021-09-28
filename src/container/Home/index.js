import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import api from "../../api/index";
import "./style.css";
import { Alert, Col, Row, Table } from "react-bootstrap";
import NewModal from "../../components/Modal";
import InputField from "../../components/InputField";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({
    variant: "success",
    message: "",
  })
  const [showAlert, setShowAlert] = useState(false);

  const getAllUser = async () => {
    try {
      const response = await api.get("/users?");
      if (response && response.data) {
        const { data } = response;
        setUsers(data.data || []);
      }
    } catch (e) {
      console.log("====> error while fetching users list data", e);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const showModal = (_user) => {
    setUser(_user);
    setShow(true);
  };

  // close
  const closeModal = () => {
    setShow(false);
  };
  console.log("==> user : ", user);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const renderUserDetails = () => {
    return (
      <NewModal
        show={show}
        handleClose={closeModal}
        modalTitle={`USER DETAILS`}
        size="lg"
        onSubmit={updateUser}
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
    console.log("=----> updating user : ", user);
    try {
      if (user.id) {
        const response = await api.patch(`/users/${user.id}`, user);
        console.log("====> update resp : ", response);
        if(response.status === 200){
          setAlert({ ...alert, message:"update has been success", variant: "success" });
          setShowAlert(true)
        }

        closeModal();
        const updatedUser = response.data;
        console.log("=-====> updatedUser ; ", updatedUser);
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
      console.log("===> error udpate User : ", e);
      if (error.status === 400) {

        setAlert({ ...alert, message: "Sonething went wrong", variant: "danger" });

        setShowAlert(true)
      }
    }
  };

  // const handleDeleteUser = () => {};
  return (
    <Layout header>
       {showAlert && <Alert variant={alert.variant} onClose={() => setShowAlert(false)} dismissible>
          {alert.message}
        </Alert>
        }
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

      {renderUserDetails()}
    </Layout>
  );
};

export default Home;
