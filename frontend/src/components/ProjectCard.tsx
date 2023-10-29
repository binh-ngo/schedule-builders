import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'
import { Carousel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ddbUpdateProject } from '../graphql/projects';
import { ddbGetAllContractors } from '../graphql/contractors';
import { ddbGetAllQueryResponse } from '../pages/Admin';

type ProjectProps = {
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

export const ProjectCard = (project: ProjectProps) => {
  const [allContractors, setAllContractors] = useState<ddbGetAllQueryResponse[]>([]);
  const [contractor, setContractor] = useState(''); 
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const getContractors = await ddbGetAllContractors();
      setAllContractors(getContractors);
    };
    fetchQuestions();
  }, []);

  const assignContractor = async (project: ProjectProps) => {

    const projectInput = {
      projectId: project.projectId,
      contractorName: contractor
    }
    console.log(projectInput)
    const response = await ddbUpdateProject(projectInput);
    if ('data' in response) {
      console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    }
  }

  const assignEstimate = async (project: ProjectProps) => {

    const projectInput = {
      projectId: project.projectId,
      estimate
    }
    const response = await ddbUpdateProject(projectInput);
    if ('data' in response) {
      console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    }
  }

  const setStartDate = async (project: ProjectProps) => {

    const projectInput = {
      projectId: project.projectId,
      startDate: new Date().toISOString()
    }
    const response = await ddbUpdateProject(projectInput);
    if ('data' in response) {
      console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    }
  }

  const setEndDate = async (project: ProjectProps) => {

    const projectInput = {
      projectId: project.projectId,
      endDate: new Date().toISOString()
    }
    const response = await ddbUpdateProject(projectInput);
    if ('data' in response) {
      console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    }
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Carousel interval={null} >
        {project.imageUrls ? (
          project.imageUrls.map((imageUrl, index) => (
            <Carousel.Item key={index}>
              <Card.Img variant="top" src={imageUrl} />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <Card.Img variant="top" src={defaultImage} />
          </Carousel.Item>
        )}
      </Carousel>      <Card.Body>
        <Card.Title>{`${project.address} | ${project.city}`}</Card.Title>
        <Card.Text>
          {`I want "${project.projectType}" made with "${project.material}".`}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{`${project.clientName} `}</ListGroup.Item>
        <ListGroup.Item>{`${project.propertyType} | ${project.clientPhone} `}</ListGroup.Item>
        <ListGroup.Item>{project.projectSize}</ListGroup.Item>
        
        {project.estimate === 0 && project.contractorName === '' ? (
          <ListGroup.Item>
            <Form.Label htmlFor="Estimate">Estimate</Form.Label>
            <Form.Control
              type="text"
              id="Estimate"
              aria-describedby="projectEstimate"
              value={estimate === 0 ? '' : estimate} 
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);

                if (!isNaN(newValue)) {
                  setEstimate(newValue); 
                } else {
                  setEstimate(0); 
                }
              }}
            />
            <button className="btn btn-primary my-2" onClick={() => assignEstimate(project)}>Submit</button>
          </ListGroup.Item>
        ) : (
          project.contractorName === '' && project.estimate ? (
            <ListGroup.Item>
              <Form.Control
                as="select" 
                id="Contractor"
                aria-describedby="assignContractor"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
              >
                <option value="">Select Contractor</option> {/* Default empty option */}
                {allContractors.map((contractor) => (
                  <option key={contractor.contractorId} value={contractor.contractorId}>
                    {contractor.contractorName}
                  </option>
                ))}
              </Form.Control>
              <button className="btn btn-primary my-2" onClick={() => assignContractor(project)}>Submit</button>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item>
              {project.startDate === '' && (
                <button className="btn btn-primary my-2 mx-1" onClick={() => setStartDate(project)}>Start Project</button>
              )}
              {project.startDate !== '' && project.endDate === '' && (
                <button className="btn btn-success my-2" onClick={() => setEndDate(project)}>End Project</button>
              )}
            </ListGroup.Item>

          )
        )}
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Contact Info</Card.Link>
      </Card.Body>
    </Card>
  )
}
