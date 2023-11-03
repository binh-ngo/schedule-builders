import { useContext, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import { BsFillClipboardCheckFill } from "react-icons/bs"
import { BiLogInCircle } from "react-icons/bi"
import { AccountContext } from "../Accounts";
import { Login } from "./Login";
import { Auth } from "aws-amplify";

export const Header = () => {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [username, setUsername] = useState('');

  const { loggedInUser } = useContext(AccountContext);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(`Cognito username: ${user.username}`);
        setUsername(user.username)
          ;
      } catch (error) {
        console.error('Error getting Cognito user:', error);
      }
    }
    fetchUserData();
  }, []);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);
  const isAdmin = loggedInUser && username === "admin";
  const isContractor = loggedInUser !== null;

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <strong className="brand">Kalan's Estimates</strong>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(!expand);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin"
                disabled={!isAdmin}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> Admin
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contractorPage"
                disabled={!isContractor}
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> Contractor
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contact"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlinePhone style={{ marginBottom: "2px" }} /> Contact
              </Nav.Link>
            </Nav.Item>

            {!loggedInUser &&
              <>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    onClick={() => updateExpanded(false)}
                  >
                    <BiLogInCircle style={{ marginBottom: "2px" }} /> Login
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/create-contractor"
                    onClick={() => updateExpanded(false)}
                  >
                    <BsFillClipboardCheckFill style={{ marginBottom: "2px" }} /> Signup
                  </Nav.Link>
                </Nav.Item>
              </>
            }

            {loggedInUser &&
              <div className="login-header">
                <Login />
              </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

