import { useEffect, useState } from 'react';
import { ddbGetAllProjectsWithEstimates, ddbGetAllProjectsWithoutEstimates } from '../graphql/projects';
import moment from 'moment';
import { ProjectCard } from '../components/ProjectCard';
import { Carousel } from 'react-bootstrap';

// This page will consist of sections displaying:
// incoming projects awaiting estimations
// estimated projects awaiting assignment to contractors
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

export const Admin = () => {
  const [projectsWithEstimates, setProjectsWithEstimates] = useState<ddbGetAllQueryResponse[]>([]);
  const [projectsWithoutEstimates, setProjectsWithoutEstimates] = useState<ddbGetAllQueryResponse[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const responseWithEstimates = await ddbGetAllProjectsWithEstimates();
      setProjectsWithEstimates(responseWithEstimates);
      const responseWithoutEstimates = await ddbGetAllProjectsWithoutEstimates();
      setProjectsWithoutEstimates(responseWithoutEstimates);
    };
    fetchQuestions();
  }, []);

  const renderProjectsWithoutEstimates = () => {
    const sortedProjectsWithoutEstimates = projectsWithoutEstimates.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );

    const cards = sortedProjectsWithoutEstimates.map((project: ddbGetAllQueryResponse) => (
      <ProjectCard
        key={project.projectId}
        clientName={project.clientName}
        clientPhone={project.clientPhone}
        email={project.email}
        address={project.address}
        city={project.city}
        description={project.description}
        material={project.material}
        projectId={project.projectId}
        projectSize={project.projectSize}
        projectType={project.projectType}
        propertyType={project.propertyType}
        desiredCompletionTime={project.desiredCompletionTime}
        imageUrls={project.imageUrls}
        estimate={project.estimate}
        startDate={project.startDate}
        endDate={project.endDate}
        clientCost={project.clientCost}
        contractorName={project.contractorName}
        createdAt={project.createdAt}
      />
    ));

    // Split the cards into groups of 5
    const cardGroups = [];
    for (let i = 0; i < cards.length; i += 3) {
      cardGroups.push(cards.slice(i, i + 3));
    }

    return (
      <div className='text-center'>
        {cardGroups[0] ? (
          <div>
            <h1 className='my-5 text-primary'>Estimate these Projects</h1>
          </div>
        ) : (
          <div>
            <h1 className='my-5 text-primary'>No projects yet</h1>
          </div>
        )}

        <Carousel interval={null}>
          {cardGroups.map((group, index) => (
            <Carousel.Item key={index}>
              <div className='d-flex justify-content-center'>
                {group}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
  const renderProjectsWithEstimates = () => {

    const sortedProjectsWithEstimates = projectsWithEstimates.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );

    const cards = sortedProjectsWithEstimates.map((project: ddbGetAllQueryResponse) => (
      <ProjectCard
        key={project.projectId}
        clientName={project.clientName}
        clientPhone={project.clientPhone}
        email={project.email}
        address={project.address}
        city={project.city}
        description={project.description}
        material={project.material}
        projectId={project.projectId}
        projectSize={project.projectSize}
        projectType={project.projectType}
        propertyType={project.propertyType}
        desiredCompletionTime={project.desiredCompletionTime}
        imageUrls={project.imageUrls}
        estimate={project.estimate}
        startDate={project.startDate}
        endDate={project.endDate}
        clientCost={project.clientCost}
        contractorName={project.contractorName}
        createdAt={project.createdAt}
      />
    ));

    // Split the cards into groups of 5
    const cardGroups = [];
    for (let i = 0; i < cards.length; i += 3) {
      cardGroups.push(cards.slice(i, i + 3));
    }

    return (
      <div className='text-center'>
        {cardGroups[0] ? (
          <div>
            <h1 className='my-5 text-primary'>Assign Contractor</h1>
          </div>
        ) : (
          <div>
            <h1 className='my-5 text-primary'>No projects yet</h1>
          </div>
        )}        <Carousel interval={null}>
          {cardGroups.map((group, index) => (
            <Carousel.Item key={index}>
              <div className='d-flex justify-content-center'>
                {group}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }

  return (
    <div>
      {renderProjectsWithoutEstimates()}
      {renderProjectsWithEstimates()}
    </div>
  )
}
