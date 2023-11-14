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
import { RequireAdminAuth } from "./RequireAdminAuth";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreateContractor } from "./pages/CreateContractor";
import { Contractor } from "./pages/Contractor";
import { RequireContractorAuth } from "./RequireContractorAuth";
import { ContactPage } from "./pages/Contact";
import { RequestLogin } from "./pages/RequestLogin";


Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Router>
        <Account>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<RequestLogin />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<RequireAdminAuth><Admin /></RequireAdminAuth>} />
            <Route path="/contractor" element={<RequireContractorAuth><Contractor /></RequireContractorAuth>} />
            <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/create-contractor" element={<CreateContractor />} />
            <Route path="/schedule-appointment" element={<ProjectFormCompleted />} />
          </Routes>
        </Account>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
