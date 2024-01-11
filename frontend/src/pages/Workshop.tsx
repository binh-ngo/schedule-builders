import { useContext, useEffect, useState } from 'react'
import { WorkshopCard } from '../components/WorkshopCard'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ddbGetAllProjectsFromAllClients } from '../graphql/projects';
import { ddbGetAllQueryResponse } from '../types/types';
import moment from 'moment';
import { ddbGetAllContractors } from '../graphql/contractors';
import { AccountContext } from '../Accounts';


export const Workshop = () => {
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState('');
  const [contractorId, setContractorId] = useState('');

  const { getCurrentAuthedUser } = useContext(AccountContext);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await ddbGetAllProjectsFromAllClients();
      setProjects(response);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getCurrentAuthedUser();
        if (user) {
          // console.log(user.username + ' is logged in.')
          setUsername(user.username);
          const resp = await ddbGetAllContractors();
          
          for (let i = 0; i < resp.length; i++) {
            const emailPart = resp[i].email ? resp[i].email.split("@")[0] : '';
            if (emailPart === username) {
              setContractorId(resp[i].contractorId);
              console.log(`Contractor ID: ${emailPart} stored`)
            } else {
              // console.log('User is not a contractor!')
            }
          }
        }
      } catch (error) {
        console.error('Error getting Cognito user:', error);
      }
    }
    fetchUserData();
  }, [username]);

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
        projectId={project.projectId}
        username={username}
        contractorId={contractorId}
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
