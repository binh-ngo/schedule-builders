import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'
import moment from 'moment'
import { ProjectProps } from '../types/types'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'


// TODO: transfer image upload capabilities here from ProjectCard
export const ClientProjectCard = (project: ProjectProps) => {


  const removeParams = (url: string) => {
    return url.split('?')[0];
  }

  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card className="clientProjectCard">
        <Row>
          <Col md={12} lg={4}>
            <Carousel interval={null} >
              {project.imageUrls ? (
                project.imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <Card.Img className="clientProjectCardImg" src={removeParams(imageUrl)} alt="project image" />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <Card.Img src={defaultImage} alt="default image" />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
          <Col md={12} lg={8} className='clientProjectCardBody'>
            <Card.Body>
              <Link to={`/projects/${project.projectId}`}>
              <Card.Title className="clientProjectCardTitle">{project.projectType}</Card.Title>
              </Link>
              <Card.Text>
                <strong>Description:</strong> {project.description}
              </Card.Text>
              {project.material &&
                <Card.Text>
                  <strong>Material:</strong> {project.material}
                </Card.Text>
              }
              {project.projectSize && (
                <Card.Text>
                  <strong>Project Size:</strong> {project.projectSize} sqft
                </Card.Text>
              )}
              <Card.Text>
                <strong>Early Estimate:</strong> ${project.earlyEstimate}
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

        </Row>
      </Card>
    </Container>
  );
};