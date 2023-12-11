import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ddbGetAllProjects } from '../graphql/projects';
import { ddbGetAllQueryResponse, ProjectProps } from '../types/types';
import moment from 'moment';
import { Auth } from 'aws-amplify';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ClientProjectCard } from '../components/ClientProjectCard';

export const ClientProfilePage = () => {

  const [projects, setProjects] = useState<ProjectProps[]>([]);

  // takes the current logged in user, and displays all their projects
  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(`Cognito username: ${user.username}`);
        console.log(`Cognito profile: ${user.attributes.profile}`);
        const response = await ddbGetAllProjects(user.username);
        if (response) {
          console.log('API Response:', response);
          setProjects(response);
        }        
      } catch (error) {
        console.error('Error getting Cognito user:', error);
      }
    }
    fetchUserData();
  }, []);

  const renderProject = (data: ddbGetAllQueryResponse[]) => {
    const sortedProjects = data.sort(
      (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    );
    return(
      <Row className='workshopContent'>
      {sortedProjects.map((project: ddbGetAllQueryResponse, index) => (
        <ClientProjectCard 
        key={index}
        projectId={project.projectId}
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
        clientName={project.clientName}
        clientPhone={project.clientPhone}
        email={project.email}
        address={project.address}
        />
      ))}
      </Row>
    )
    }

  return (
       <HelmetProvider>
      <Helmet>
        <title>My Projects | Submit your Project Whenever You're Ready</title>
        <meta
          name="description"
          content="Welcome to the page where you can manage and publish your projects for contractors to see! We want to protect the privacy of your information, so you tell us when you're ready."
        />
        </Helmet>
    <Container className='projectInfo'>
    <Row>
      <Col className="clientProfileParagraph" sm={7}>
        <h1>Welcome!</h1>
        <p className='clientParagraph'>We value the privacy of your information so we will only send it out when you're ready. Are you trying to get this product done sooner? Provide further information
        by clicking on the button below and it will expedite your project request whenever you're ready.</p>
        <div className='mt-5'>
        {/* <Button className="mx-2" style={{ backgroundColor: '#164863' }} href="#" size="lg">I'm Ready!</Button> */}
        <Button className="mx-2" style={{"backgroundColor": "black"}} href="#" size="lg">Provide Information</Button>
        </div>
      </Col>
      {renderProject(projects)}
    </Row>
  </Container>  
        </HelmetProvider>
  )
}
