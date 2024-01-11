import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles'
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

const config = {
  region: "us-east-1"
}

const client = new CognitoIdentityProviderClient(config);

export const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [code, setCode] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const input = { 
        ClientId: process.env.REACT_APP_USER_POOL_ID,
        Username: username,
        ConfirmationCode: code,
        Password: confirmedPassword
      };
      // console.log(JSON.stringify(input))
      const command = new ConfirmForgotPasswordCommand(input);
      const response = await client.send(command);
      if (response) {
        console.log("Password changed successfully");
      }
    } catch {
      console.log('Cognito Error')
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <Form onSubmit={onSubmit} className="login-form d-flex flex-column">
        
        <Form.Group className="mb-4">
          <Form.Label className="login-label font-semibold px-2">Verification Code:</Form.Label>
          <Form.Control
            className="login mt-2 bg-transparent px-2 py-1 rounded-md"
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="login-label font-semibold px-2">Username:</Form.Label>
          <Form.Control
            className="login mt-2 bg-transparent px-2 py-1 rounded-md"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Form.Group className="mb-4">
          <Form.Label className="login-label px-2">ConfirmedPassword:</Form.Label>
          <Form.Control
            className="login mt-2 bg-transparent px-2 py-1 rounded-md"
            type="password"
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" className="btn"
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>
            Reset Password
          </Button>
        </div>
      </Form>
    </div>
  )
}
