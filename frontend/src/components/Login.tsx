import React, { useContext, useState } from 'react';
import { AccountContext } from '../Accounts';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles'

export const Login = (props:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { loggedInUser, signIn, signOut } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Check if the user exists
      const existingUser = await signIn(email, password);
      // console.log("Logged in.", existingUser);
      navigate(from, { replace: true });
    } catch (loginError) {
      console.error("Error logging in.", loginError);
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
<div className="d-flex flex-column justify-content-center">
      {!loggedInUser && (
        <Form onSubmit={onSubmit} className="login-form d-flex flex-column">
          <Form.Group className="mb-4">
            <Form.Label className="login-label font-semibold px-2">Username:</Form.Label>
            <Form.Control
              className="login mt-2 bg-transparent px-2 py-1 rounded-md"
              type="text"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="login-label px-2">Password:</Form.Label>
            <Form.Control
              className="login mt-2 bg-transparent px-2 py-1 rounded-md"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Label><a href='/forgot-password'>Reset Password</a></Form.Label>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="d-flex justify-content-center">
            {!loggedInUser && (
              <Button type="submit" className="btn"      
                      style={buttonStyle} 
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}>
                Login
              </Button>
            )}
          </div>
        </Form>
      )}

      {loggedInUser && (
        <button
          onClick={() => signOut(() => navigate("/"))}
          className="btn font-size-lg"
          style={buttonStyle} 
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}        >
          Log Out
        </button>
      )}
    </div>
  );
};
