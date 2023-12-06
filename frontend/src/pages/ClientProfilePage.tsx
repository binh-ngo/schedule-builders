import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { ddbGetProjectById } from '../graphql/projects';
import { ProjectProps } from '../types/types';

export const ClientProfilePage = () => {

  const { projectId } = useParams();

  const [project, setProject] = useState<ProjectProps>();
  useEffect(() => {
    const fetchClient = async () => {
      const response = await ddbGetProjectById(projectId ?? "");
        if (response) {
          console.log('API Response:', response);
          setProject(response);
        }
    };
    fetchClient();
  }, [projectId]);

  return (
    <Container className='hero-section'>
    <Row>
      <Col className="intro typewriter" sm={7}>
        <h1>Welcome!</h1>
        <p className='heroParagraph'>We value the privacy of your information so we will only send it out when you're ready. Are you trying to get this product done sooner? Provide further information
        by clicking on the button below and it will expedite your project request whenever you're ready.</p>
        <div className='mt-5'>
        {/* <Button className="mx-2" style={{ backgroundColor: '#164863' }} href="#" size="lg">I'm Ready!</Button> */}
        <Button className="mx-2" style={{"backgroundColor": "black"}} href="#" size="lg">Provide Information</Button>
        </div>
      </Col>
      <Col sm={5} className="mt-5">
      <Card>
      <Card.Body>
        <Card.Title>{project?.clientName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Client Phone: {project?.clientPhone}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Email: {project?.email}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Address: {project?.address}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">City: {project?.city}</Card.Subtitle>

        <Card.Text>
          <strong>Description:</strong> {project?.description}
        </Card.Text>
        <Card.Text>
          <strong>Material:</strong> {project?.material}
        </Card.Text>
        <Card.Text>
          <strong>Project Size:</strong> {project?.projectSize} sq ft
        </Card.Text>
        <Card.Text>
          <strong>Project Type:</strong> {project?.projectType}
        </Card.Text>
        <Card.Text>
          <strong>Desired Completion Time:</strong> {project?.desiredCompletionTime}
        </Card.Text>
        <Card.Text>
          <strong>Created At:</strong> {project?.createdAt}
        </Card.Text>
      </Card.Body>
    </Card>
      </Col>
    </Row>
  </Container>  
  )
}
