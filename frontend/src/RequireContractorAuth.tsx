import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";
import { RequestLogin } from "./pages/RequestLogin";

export const RequireContractorAuth = ({ children }: { children: JSX.Element }) => {
  const [profile, setProfile] = useState('');
  const { loggedInUser, getCurrentAuthedUser } = useContext(AccountContext);

  useEffect(() => {
    async function fetchUserData() {
        try {
            const user = await getCurrentAuthedUser();
            // console.log(`Cognito username: ${user.username}`);
            setProfile(user.attributes.profile);
            ;
        } catch (error) {
            console.error('Error getting Cognito user:', error);
        }
    }
    fetchUserData();
}, []);

const isPro = loggedInUser && (profile === "pro" || profile === "admin");

  if (!isPro) {
    console.log(`status: not authed, redirecting to login...`);
    return <RequestLogin />;
  } else {
  return children;
}
};
