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
import RequireAuth from "./RequireAuth";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";


Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Router>
        <Account>
      <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
            <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/schedule-appointment" element={<ProjectFormCompleted />} />
          </Routes>
        </Account>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
