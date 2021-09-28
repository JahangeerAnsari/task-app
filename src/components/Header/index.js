import Button from "@restart/ui/esm/Button";
import React from "react";
import { Container, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

export const Header = (props) => {
  const userData = localStorage.getItem("user");
  const history = useHistory();

  if (!userData) {
    return history.push("/signin");
  }

  const user = JSON.parse(userData);

  console.log("USEEEERTY", user);

  const logout = () => {
    localStorage.removeItem("user");
    return history.push("/signin");
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
           Admin DashBoard
          </Link>
          <Nav className="mr-right">
            <NavItem style={{color:"white"}}> hi, {user.firstName}</NavItem>
            <NavItem>
              <Button onClick={logout}>Logout</Button>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
