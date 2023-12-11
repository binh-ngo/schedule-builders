import { ChangeEvent, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'
import { buttonStyle, handleMouseOut, handleMouseOver } from './styles';
import moment from 'moment'
import { ProjectProps } from '../types/types'
import { ddbPublishProject, ddbUpdateProject } from '../graphql/projects'
// import { Link } from 'react-router-dom'

interface FormData {
  imageUrls: File[] | undefined;
}

// TODO: transfer image upload capabilities here from ProjectCard
export const ClientProjectCard = (project: ProjectProps) => {
  const [bid, setBid] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [] as File[],
  });

  const removeParams = (url: string) => {
    return url.split('?')[0];
  }

  const handlePublish = async (projectId: string) => {
    try {
      const response = await ddbPublishProject(projectId);
      console.log(response);
    } catch (err) {
      console.log(`err: ${JSON.stringify(err, null, 2)}`);
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
  console.log("Image URLs:", project.imageUrls);
  console.log('Project Data:', project);

  return (
    // <Link className="custom-link my-5" to={`/${props.projectId}`}>
    <Container className="d-flex justify-content-center align-items-center">
    <Card className="workshopCard">
      <Row>
        <Col md={12} lg={4}>
          <div className="image-container">
            {project.imageUrls ? (
              project.imageUrls.map((imageUrl) => (
                <Card.Img
                  key={imageUrl} // Add a unique key to each image
                  variant="top"
                  src={removeParams(imageUrl)}
                  className="workshopCardImg"
                />
              ))
            ) : (
              <Card.Img
                variant="top"
                src={defaultImage}
                alt="default image"
                className="workshopCardImg"
              />
            )}
          </div>
        </Col>
        <Col md={12} lg={4}>
          <Card.Body>
            <Card.Title className="workshopCardTitle">{project.projectType}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {project.description}
            </Card.Text>
            <Card.Text>
              <strong>Material:</strong> {project.material}
            </Card.Text>
            {project.projectSize && (
              <Card.Text>
                <strong>Project Size:</strong> {project.projectSize} sqft
              </Card.Text>
            )}
            <Card.Text>
              <strong>Desired Completion Time:</strong> {project.desiredCompletionTime}
            </Card.Text>
            <Card.Text>
              <strong>Start Date:</strong> {moment(project.startDate).format('MMMM Do, YYYY')}
            </Card.Text>
            <Card.Text>
              <strong>End Date:</strong> {moment(project.endDate).format('MMMM Do, YYYY')}
            </Card.Text>
            <Card.Text>
              <strong>Created At:</strong> {moment(project.createdAt).format('MMMM Do, YYYY')}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col md={12} lg={4}>
          <form className="image-form mt-5" encType='multipart/form-data'>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                name="imageUrl"
                multiple
                onChange={handleImageChange}
              />
              {formData.imageUrls !== null ? (
                <p>Selected Image Count: {formData.imageUrls ? formData.imageUrls.length : 0}</p>
              ) : (
                <p>No Image Selected</p>
              )}
            </div>
            <Button
              style={buttonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={(e) => updateImages(project, e)}
            >
              {project.imageUrls ? `Change Pictures` : `Upload`}
            </Button>
            <Button
              // publish post
              onClick={() => handlePublish(project.projectId ?? '')}
              style={buttonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Send to Contractors
            </Button>
          </form>
        </Col>
      </Row>
    </Card>
  </Container>
    // </Link>
  );
};