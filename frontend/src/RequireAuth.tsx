import { useContext } from "react";
import { AccountContext } from "./Accounts";
import { RequestLogin } from "./pages/RequestLogin";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { loggedInUser } = useContext(AccountContext);

  if (!loggedInUser) {
    console.log(`status: not authed, redirecting to login...`);
    return <RequestLogin />;
  } else {
  return children;
}
};
