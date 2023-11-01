import React, { useContext, useState } from 'react';
// import { Auth } from 'aws-amplify';
import { AccountContext } from '../Accounts';
import { useNavigate } from 'react-router-dom';

export const Login = (props:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { loggedInUser, signIn, signOut } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Check if the user exists
      const existingUser = await signIn(username, password);
      console.log("Logged in.", existingUser);
      navigate(from, { replace: true });
    } catch (loginError) {
      console.error("Error logging in.", loginError);
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login d-flex flex-row justify-content-center">
    {!loggedInUser && (
      <form onSubmit={onSubmit} className="d-flex flex-row">
        <div className="mb-4">
          <label className="font-semibold px-2">Username:</label>
          <input
            className="login mt-2 bg-transparent px-2 py-1 rounded-md"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold px-2">Password:</label>
          <input
            className="login mt-2 bg-transparent px-2 py-1 rounded-md"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex justify-center">
          {!loggedInUser && (
            <button className="btn bg-transparent my-2 mx-2">
              Login
            </button>
          )}
        </div>
      </form>
    )}

    {loggedInUser && (
      <button
        onClick={() => signOut(() => navigate("/"))}
        className="btn bg-transparent font-size-lg"
      >
        Log Out
      </button>
    )}
  </div>
  );
  }
