import moment from 'moment';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { ddbGetAllQueryResponse } from '../components/AdminTabs';
import { ContractorProjectCard } from '../components/ContractorProjectCard';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
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
      <ContractorProjectCard
        key={project.projectId}
        description={project.description}
        material={project.material}
        projectType={project.projectType}
        propertyType={project.propertyType}
        projectSize={project.projectSize}
        city={project.city}
        imageUrls={project.imageUrls}
      />
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
      <Helmet>
        <title>View Available Projects</title>
        <meta
          name="description"
          content="Browse projects estimated by our administrator. Access a variety of available projects as a registered contractor."

        />
      </Helmet>
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
