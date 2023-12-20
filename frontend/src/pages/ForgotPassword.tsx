import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles'
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { useNavigate } from 'react-router-dom';
const config = {
  region: "us-east-1"
}

const client = new CognitoIdentityProviderClient(config);

export const ForgotPassword = () => {
  const [username, setUsername] = useState('');

  let navigate = useNavigate();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      // console.log(process.env.REACT_APP_USER_POOL_ID);
      const input = { 
        ClientId: process.env.REACT_APP_USER_POOL_ID,
        Username: username,
      };
      // console.log(JSON.stringify(input))
      const command = new ForgotPasswordCommand(input);
      const response = await client.send(command);
      if (response) {
        // console.log(`Verification email sent to ${username}`);
        navigate('/reset-password', {state: {username: username}})
      }
    } catch {
      console.log('Cognito Error')
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <Form onSubmit={onSubmit} className="login-form d-flex flex-column">

        <Form.Group className="mb-4">
          <Form.Label className="login-label font-semibold px-2">Username:</Form.Label>
          <Form.Text>*first part of your email address</Form.Text>
          <Form.Control
            className="login mt-2 bg-transparent px-2 py-1 rounded-md"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" className="btn"
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>
            Receive Code
          </Button>
        </div>
      </Form>
    </div>
  )
}
