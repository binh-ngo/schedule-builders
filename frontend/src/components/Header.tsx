import { useContext, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { TbHammer } from "react-icons/tb";
import { BsBuildings, BsFillClipboardCheckFill } from "react-icons/bs"
import { BiLogInCircle } from "react-icons/bi"
import { AccountContext } from "../Accounts";
import { Login } from "./Login";
import { Auth } from "aws-amplify";

export const Header = () => {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('');

  const { loggedInUser } = useContext(AccountContext);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if(user) {
          console.log(`Cognito username: ${user.username}`);
          console.log(`Cognito profile: ${user.attributes.profile}`);
          setUsername(user.username);
          setProfile(user.attributes.profile);
        }
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
  
  const isAdmin = profile === "admin";
  const isPro = (profile === "pro" || profile === "admin");
  const isClient = (profile === "client" || profile === "admin");

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container className='header'>
        <Navbar.Brand href="/" className="d-flex">
          <strong className="brand">Schedule.builders</strong>
        </Navbar.Brand>
        <Navbar.Toggle
          style={{'color': 'black'}}
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(!expand);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav" style={{'color': 'black'}}>
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                  <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                </Nav.Link>
              </Nav.Item>
          
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/about"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineFundProjectionScreen
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  About Us
                </Nav.Link>
              </Nav.Item>
                
                <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/pro"
                  onClick={() => updateExpanded(false)}
                >
                  <TbHammer style={{'marginBottom': "2px"}}/> Pro
                </Nav.Link>
              </Nav.Item>


              {isAdmin &&
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  disabled={!isPro}
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineUser style={{ marginBottom: "2px" }} /> Admin
                </Nav.Link>
              </Nav.Item>
            }

            {isPro &&
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/pro/workshop"
                  onClick={() => updateExpanded(false)}
                  >
                  <BsBuildings style={{ marginBottom: "2px" }}/> Workshop
                </Nav.Link>
              </Nav.Item>
            }

            {isClient &&
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/projects"
                  onClick={() => updateExpanded(false)}
                  >
                  My Projects
                </Nav.Link>
              </Nav.Item>
            }

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

