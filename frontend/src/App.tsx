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
Amplify.configure(awsconfig);

function App() {
  return (
    <div>
    <Router>
      <Account>
        <Routes>
        <Route path="/" element={<ProjectForm />} />
        <Route path="/schedule" element={<ProjectFormCompleted />} />
        </Routes>
      </Account>
    </Router>
    </div>
  );
}

export default App;
