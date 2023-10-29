import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Amplify } from "aws-amplify"
import { awsconfig } from "./aws-exports";
import ProjectForm from './components/ProjectForm';
import { Account } from "./Accounts";
import { ProjectFormCompleted } from "./pages/ProjectFormCompleted";
import { Admin } from "./pages/Admin";
// import RequireAuth from "./RequireAuth";
import { LandingPage } from "./pages/LandingPage";
import 'bootstrap/dist/css/bootstrap.min.css';


Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Router>
        <Account>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/schedule-appointment" element={<ProjectFormCompleted />} />
          </Routes>
        </Account>
      </Router>
    </div>
  );
}

export default App;
