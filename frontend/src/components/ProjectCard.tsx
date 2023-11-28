import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'
import { Carousel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { ddbUpdateProject } from '../graphql/projects';
import { ddbGetAllContractors } from '../graphql/contractors';
import { ddbGetAllQueryResponse, ProjectProps } from '../types/types';


interface FormData {
  imageUrls: File[] | null;
}

export const ProjectCard = (project: ProjectProps) => {
  const [allContractors, setAllContractors] = useState<ddbGetAllQueryResponse[]>([]);
  const [contractor, setContractor] = useState('');
  const [estimate, setEstimate] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [] as File[],
  });

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
      setContractor(contractor);
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
      setEstimate(estimate);
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
      window.location.reload();
      console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList | null;

    if (files !== null) {
      const updatedImageUrls = [...formData.imageUrls!, ...Array.from(files)];
      setFormData({ ...formData, imageUrls: updatedImageUrls });
      console.log(`IMAGES: ${updatedImageUrls}`);
    }
  };

  const updateImages = async (project: ProjectProps, e: React.FormEvent) => {
    e.preventDefault();
    if (formData.imageUrls) {
      console.log('Images submitted:', formData);

      const projectInput = {
        imageUrls: formData.imageUrls || undefined,
        projectId: project.projectId
      }

      let updatedProject = null;
      const response = await ddbUpdateProject(projectInput);
      if ('data' in response) {
        updatedProject = response.data.updateProject;
        console.log(`Response from DynamoDB: ${JSON.stringify(updatedProject)}`);
      } else {
        console.error('Response is not a GraphQL result:', response);
      } if (updatedProject) {
        console.log("Images successfully uploaded")
        console.log(updatedProject.imageUrls)
        const uploadUrls = updatedProject.imageUrls;
        for (let i = 0; i < uploadUrls.length; i++) {
          fetch(uploadUrls[i], {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: formData.imageUrls[i]
          })
        }
      } else {
        console.log("onSave called but no images provided");
      }
    }
  };

  const removeParams = (url: string) => {
    return url.split('?')[0];
  }

  const isEstimateValid = () => {
    const valid = estimate !== 0;

    return valid;
};

  return (
    <div>
      <div className='card-container'>

        <Card className="project-card">
          <Carousel interval={null} >
            {project.imageUrls ? (
              project.imageUrls.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                  <Card.Img variant="top" src={removeParams(imageUrl)} className="card-img-responsive" />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <Card.Img variant="top" src={defaultImage} alt="default image" className="card-img-responsive" />
              </Carousel.Item>
            )}
          </Carousel>
          <Card.ImgOverlay>
            <div className="card-content bg-light">
              <Card.Title>{`${project.address} | ${project.city}`}</Card.Title>
              <Card.Text>
                {`I want "${project.projectType}" made with "${project.material}".`}
              </Card.Text>
              <Card.Text>
                {`${project.clientName} | ${project.propertyType} | ${project.clientPhone} | ${project.projectSize}`}
              </Card.Text>
              </div>

              <ListGroup>
                <div className='image-estimate-input bg-light'>
                  <form className="image-form" encType='multipart/form-data'>
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        name="imageUrl"
                        multiple
                        onChange={handleImageChange}
                        className=""
                        />
                      {formData.imageUrls !== null ? (
                        <p>Selected Image Count: {formData.imageUrls ? formData.imageUrls.length : 0}</p>
                      ) : (
                        <p>No Image Selected</p>
                      )}
                    </div>
                    <button className="upload-btn btn btn-primary" onClick={(e) => updateImages(project, e)}>{project.imageUrls ? `Change Pictures` : `Upload`}</button>
                  </form>
                  {project.estimate === 0 && project.contractorName === '' ? (
                    <ListGroup.Item className="bg-transparent">
                      <Form.Control
                        type="text"
                        placeholder='Estimate'
                        id="Estimate"
                        className="bg-transparent"
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
                      <button className={`submit-button mt-2 ${!isEstimateValid() ? 'btn btn-secondary' : ''}`} disabled={!isEstimateValid()} onClick={() => assignEstimate(project)}>{`Submit`}</button>
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
                          <option value="">Select Contractor</option>
                          {allContractors.map((contractor) => (
                            <option key={contractor.contractorId} value={contractor.contractorId}>
                              {contractor.contractorName}
                            </option>
                          ))}
                        </Form.Control>
                        <button className="btn btn-primary my-2" onClick={() => assignContractor(project)}>Assign</button>
                      </ListGroup.Item>
                    ) : (
                      <ListGroup.Item className='bg-transparent mt-4'>
                        {project.startDate === '' && (
                          <button className="btn btn-primary my-2 mx-1" onClick={() => setStartDate(project)}>Start Project</button>
                        )}
                        {project.startDate !== '' && project.endDate === '' && (
                          <button className="btn btn-success my-2" onClick={() => setEndDate(project)}>End Project</button>
                        )}
                      </ListGroup.Item>
                    )
                  )}
                </div>

              </ListGroup>
          </Card.ImgOverlay>
        </Card>
      </div>

    </div>

  )
}
