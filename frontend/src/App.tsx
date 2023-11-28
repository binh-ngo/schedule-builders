import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Amplify } from "aws-amplify"
import { awsconfig } from "./aws-exports";
import ProjectForm from './components/ProjectForm';
import { Account } from "./Accounts";
// import { ProjectFormCompleted } from "./pages/ProjectFormCompleted";
import { Admin } from "./pages/Admin";
// import RequireAuth from "./RequireAuth";
import { ContractorLandingPage } from "./pages/ContractorLandingPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RequireAdminAuth } from "./RequireAdminAuth";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreateContractor } from "./pages/CreateContractor";
import { Contractor } from "./pages/Contractor";
import { RequireContractorAuth } from "./RequireContractorAuth";
import { ContactPage } from "./pages/Contact";
import { RequestLogin } from "./pages/RequestLogin";
import { CreateForm } from "./components/CreateForm";
import { LandingPage } from "./pages/LandingPage";
import { AboutPage } from "./pages/AboutPage";
import { Page1 } from "./pages/templates/landingPages/Page1";
import { ClientProfilePage } from "./pages/ClientProfilePage";


Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <Router>
        <Account>
          <Header />
          <Routes>
            <Route path="/test" element={<ClientProfilePage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/:projectId" element={<ClientProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pro" element={<ContractorLandingPage />} />
            <Route path="/pro/:contractorName" element={<Page1 />} />
            <Route path="/login" element={<RequestLogin />} />
            <Route path="/pro/contact" element={<ContactPage />} />
            <Route path="/admin" element={<RequireAdminAuth><Admin /></RequireAdminAuth>} />
            <Route path="/contrproactor/admin" element={<RequireContractorAuth><Contractor /></RequireContractorAuth>} />
            <Route path="/pro/create-form" element={<CreateForm />} />
            <Route path="/create-contractor" element={<CreateContractor />} />
            <Route path="/create-project" element={<ProjectForm />} />
            {/* <Route path="/schedule-appointment" element={<ProjectFormCompleted />} /> */}
          </Routes>
        </Account>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
