import React, { useEffect, useState } from 'react'
import { WorkshopCard } from '../components/WorkshopCard'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ddbGetAllProjectsFromAllClients } from '../graphql/projects';
import { ddbGetAllQueryResponse } from '../types/types';
import moment from 'moment';


export const Workshop = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await ddbGetAllProjectsFromAllClients();
      setProjects(response);
    };
    fetchProjects();
  }, []);

  const renderProject = (data: ddbGetAllQueryResponse[]) => {
    const sortedProjects = data.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );
    return(
      <HelmetProvider>
      <Helmet>
        <title>Pro Workshop | Bid on Projects Now</title>
        <meta
          name="description"
          content="Exclusive access to Schedule.builders' incoming projects. Set your best price and gain clients now!"
        />
      </Helmet>
      <div className='workshopContent'>
      {sortedProjects.map((project: ddbGetAllQueryResponse, index) => (
        <WorkshopCard 
        key={index}
        projectType={project.projectType}
        description={project.description}
        city={project.city}
        material={project.material}
        projectSize={project.projectSize}
        propertyType={project.propertyType}
        imageUrls={project.imageUrls}
        earlyEstimate={project.earlyEstimate}
        startDate={project.startDate}
        endDate={project.endDate}
        desiredCompletionTime={project.desiredCompletionTime}
        createdAt={project.createdAt}
        />
      ))}
      </div>
    </HelmetProvider>

    )
    }
  return (
    // TODO: Create a filter bar that organizes and filters projects by category 
    //  Example: createdAt, projectType, etc.
   <>
    {renderProject(projects)}
   </>
  )
}
