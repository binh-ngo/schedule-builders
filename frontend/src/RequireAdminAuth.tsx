import { Auth } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";
import { RequestLogin } from "./pages/RequestLogin";

export const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
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

  if (!loggedInUser || username !== 'admin') {
    console.log(`status: not authed, redirecting to login...`);
    return <RequestLogin />;
  } else {
  return children;
}
};

