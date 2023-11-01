import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { ddbGetAllProjectsWithEstimates, ddbGetAllProjectsWithEstimatesAndContractors, ddbGetAllProjectsWithoutEstimates } from '../graphql/projects';
import moment from 'moment';
import { ProjectCard } from '../components/ProjectCard';

export type ddbGetAllQueryResponse = {
    clientName: string;
    projectId?: string;
    clientPhone: string;
    email: string;
    address: string;
    city: string;
    description: string;
    material: string;
    projectSize: string;
    projectType: string;
    propertyType: string;
    desiredCompletionTime: string;
    imageUrls?: string[];
    estimate?: number;
    startDate?: string;
    endDate?: string;
    clientCost?: number;
    contractorId?: string;
    contractorName?: string;
    createdAt: string;
    updatedAt?: string;
}

export const AdminTabs = () => {
    const [projectsWithEstimates, setProjectsWithEstimates] = useState<ddbGetAllQueryResponse[]>([]);
    const [projectsWithEstimatesAndContractors, setProjectsWithEstimatesAndContractors] = useState<ddbGetAllQueryResponse[]>([]);
    const [projectsWithoutEstimates, setProjectsWithoutEstimates] = useState<ddbGetAllQueryResponse[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const responseWithEstimates = await ddbGetAllProjectsWithEstimates();
            setProjectsWithEstimates(responseWithEstimates);
            const responseWithEstimatesandContractors = await ddbGetAllProjectsWithEstimatesAndContractors();
            setProjectsWithEstimatesAndContractors(responseWithEstimatesandContractors);
            const responseWithoutEstimates = await ddbGetAllProjectsWithoutEstimates();
            setProjectsWithoutEstimates(responseWithoutEstimates);
        };
        fetchQuestions();
    }, []);
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
    
      return (
        <Tabs
          defaultActiveKey="projectsWithEstimates"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="projectsWithEstimates" title="Projects to Estimate">
            {renderProjectTab(projectsWithoutEstimates)}
          </Tab>
          <Tab eventKey="assignContractor" title="Assign Contractor">
            {renderProjectTab(projectsWithEstimates)}
          </Tab>
          <Tab eventKey="manageProjects" title="Manage Projects">
            {renderProjectTab(projectsWithEstimatesAndContractors)}
          </Tab>
          <Tab eventKey="calendar" title="Calendar">
            <div className='calendar'>
              <iframe
                title="Google Calendar"
                src="https://calendar.google.com/calendar/embed?src=kalansestimates%40gmail.com&ctz=America%2FLos_Angeles"
                style={{ border: 0 }}
                width="1200"
                height="600"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          </Tab>
        </Tabs>
      );
    }
    