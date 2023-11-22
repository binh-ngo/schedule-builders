import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { ddbGetAllProjectsWithEstimates, ddbGetAllProjectsWithEstimatesAndContractors, ddbGetAllProjectsWithoutEstimates } from '../graphql/projects';
import moment from 'moment';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ddbGetAllForms } from '../graphql/forms';
import { ddbGetAllFormResponse, ddbGetAllQueryResponse } from '../types/types';
import { CreateForm } from './CreateForm';
import { FormCard } from './FormCard';
import { Button, Modal } from 'react-bootstrap';

export const AdminTabs = () => {
  const [projectsWithEstimates, setProjectsWithEstimates] = useState<ddbGetAllQueryResponse[]>([]);
  const [projectsWithEstimatesAndContractors, setProjectsWithEstimatesAndContractors] = useState<ddbGetAllQueryResponse[]>([]);
  const [projectsWithoutEstimates, setProjectsWithoutEstimates] = useState<ddbGetAllQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<ddbGetAllFormResponse[]>([]);
  const [selectedTab, setSelectedTab] = useState("projectsWithoutEstimates");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); 
  
      switch (selectedTab) {
        case "projectsWithoutEstimates":
          const responseWithoutEstimates = await ddbGetAllProjectsWithoutEstimates();
          setProjectsWithoutEstimates(responseWithoutEstimates);
          break;
  
        case "assignContractor":
          const responseWithEstimates = await ddbGetAllProjectsWithEstimates();
          setProjectsWithEstimates(responseWithEstimates);
          break;
  
        case "manageProjects":
          const responseWithEstimatesAndContractors = await ddbGetAllProjectsWithEstimatesAndContractors();
          setProjectsWithEstimatesAndContractors(responseWithEstimatesAndContractors);
          break;
  
        case "allForms":
          const fetchForms = await ddbGetAllForms();
          setForms(fetchForms);
          break;
    
        default:
          break;
      }
  
      setLoading(false); // Set loading to false after data is fetched
    };
  
    fetchProjects();
  }, [selectedTab]);

  const renderProjectTab = (data: ddbGetAllQueryResponse[]) => {
    const sortedProjects = data.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );

    const cards = sortedProjects.map((project) => (
      <ProjectCard key={project.projectId} {...project} />
    ));

    return (
      <div className='text-center'>
        {!cards.length &&
          <div>
            <h1 className='my-5 text-black'>No Projects Yet</h1>
          </div>}
        {cards.map((card, index) => (
          <div key={index} className='d-flex justify-content-center my-3'>
            {card}
          </div>
        ))}
      </div>
    );
  }

  const renderFormTab = (data: ddbGetAllFormResponse[]) => {
    // render alphabetically
    const sortedForms = data.slice().sort((a, b) => a.formName.localeCompare(b.formName));
  
    const cards = sortedForms.map((form) => (
      <FormCard key={form.formId} {...form} />
    ));
  

    return (
      <div className='container-fluid text-center'>
      <div className='row justify-content-center'>
        {!cards.length && (
          <div className='col-12'>
            <h1 className='my-5 text-black formHeader'>No Forms Yet</h1>
          </div>
        )}
        {cards.map((card, index) => (
          <div key={index} className='col-md-4 my-3 formCards'>
            {card}
          </div>
        ))}
      </div>
    </div>
    
    );
  }

  

  return (
    <Tabs
      defaultActiveKey={selectedTab}
      onSelect={(key) => setSelectedTab(key as string)}
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="projectsWithoutEstimates" title="Projects to Estimate">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
            <LoadingSpinner />
          </div>
        ) : (
          renderProjectTab(projectsWithoutEstimates)
        )}
      </Tab>
      <Tab eventKey="assignContractor" title="Assign Contractor">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
            <LoadingSpinner />
          </div>
        ) : (
          renderProjectTab(projectsWithEstimates)
        )}
      </Tab>
      <Tab eventKey="manageProjects" title="Manage Projects">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
            <LoadingSpinner />
          </div>
        ) : (
          renderProjectTab(projectsWithEstimatesAndContractors)
        )}
      </Tab>
      <Tab eventKey="Calendar" title="Calendar">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
            <LoadingSpinner />
          </div>
        ) : (
          <iframe className="calendar" title="calendar" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showTz=0&src=a2FsYW5zZXN0aW1hdGVzQGdtYWlsLmNvbQ&color=%23039BE5" scrolling="no"></iframe>
        )}
      </Tab>
      <Tab eventKey="allForms" title="View All Forms">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <Button onClick={handleShow}>
              Hello
            </Button>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateForm />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            
            </Modal>
            {renderFormTab(forms)}
          </div>
        )}
      </Tab>
    </Tabs>
  );
}

