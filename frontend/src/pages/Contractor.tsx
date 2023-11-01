import moment from 'moment';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ddbGetAllQueryResponse } from '../components/AdminTabs';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ProjectCard } from '../components/ProjectCard';
import { ddbGetAllProjectsWithEstimates } from '../graphql/projects';

export const Contractor = () => {
    const [projectsWithEstimates, setProjectsWithEstimates] = useState<ddbGetAllQueryResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            console.log('Fetching data...');
            const responseWithEstimates = await ddbGetAllProjectsWithEstimates();
            console.log('Data fetched:', responseWithEstimates);
            setProjectsWithEstimates(responseWithEstimates);
            setLoading(false);
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
                <h1 className='header my-5 text-black'>No Projects Yet</h1>
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
    <div className='contractor-page'>
      <Header />
      <div className="tab">
      <Tabs
          defaultActiveKey="availableProjects"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
          >
      <Tab eventKey="availableProjects" title="Available Projects">
        {loading ? (
            <div className="text-center">
            <p>Loading...</p>
            <LoadingSpinner />
          </div>
        ) : (
            renderProjectTab(projectsWithEstimates)
        )}
      </Tab>
        </Tabs>
            </div>
    </div>
  )
}
