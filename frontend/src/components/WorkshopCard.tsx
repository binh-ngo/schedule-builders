import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'
import { buttonStyle, handleMouseOut, handleMouseOver } from './styles';
import moment from 'moment'


type WorkshopCardProps = {
  projectType: string;
  description: string;
  city: string;
  material: string;
  projectSize: number;
  propertyType: string;
  imageUrls: string[] | undefined;
  earlyEstimate: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  desiredCompletionTime: string;
  createdAt: string;
}

export const WorkshopCard = (props: WorkshopCardProps) => {
  const [bid, setBid] = useState(0);

  const createBid = async () => {
    // TODO: CREATE NEW ENTITY PK = PROJECTID SK = BIDID
    // const projectInput = {
    //   projectId: project.projectId,
    //   estimate
    // }
    // const response = await ddbUpdateProject(projectInput);
    // if ('data' in response) {
    //   console.log(`Response from DynamoDB: ${JSON.stringify(response)}`);
    //   setEstimate(estimate);
    // } else {
    //   console.error('Response is not a GraphQL result:', response);
    // }
  }

  const removeParams = (url: string) => {
    return url.split('?')[0];
  }

  const isBidValid = () => {
    const valid = bid !== 0;

    return valid;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="workshopCard">
        <Row>
          <Col md={4}>
            {props.imageUrls ? (
          props.imageUrls.map((imageUrl, index) => (
            <Card.Img
              variant="top"
              src={removeParams(imageUrl)}
              className="card-img-responsive"
              style={{ height: '100%' }}
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
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="workshopCardTitle">{props.projectType}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {props.description}
              </Card.Text>
              <Card.Text>
                <strong>Material:</strong> {props.material}
              </Card.Text>
              {props.projectSize && (
              <Card.Text>
                <strong>Project Size:</strong> {props.projectSize} sqft
              </Card.Text>
                )
              }
              <Card.Text>
                <strong>Desired Completion Time:</strong> {props.desiredCompletionTime} {(moment(props.startDate).format('MMMM Do, YYYY') !== moment(props.endDate).format('MMMM Do, YYYY')) && `| ${props.startDate}-${props.endDate}`}
              </Card.Text>
              <Card.Text>
                <strong>Start Date:</strong> {moment(props.startDate).format('MMMM Do, YYYY')}
              </Card.Text>
              <Card.Text>
              <strong>End Date:</strong> {moment(props.endDate).format('MMMM Do, YYYY')}
              </Card.Text>
              <Card.Text>
                <strong>Created At:</strong> {moment(props.createdAt).format('MMMM Do, YYYY')}
              </Card.Text>
              <div className='bidSection'>
                <Form.Label>
                  $
                </Form.Label>
                <Form.Control
                  type="text"
                  id="Bid"
                  className="bg-transparent bidInput"
                  aria-describedby="projectBid"
                  value={bid === 0 ? '' : bid}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);

                    if (!isNaN(newValue)) {
                      setBid(newValue);
                    } else {
                      setBid(0);
                    }
                  }}
                />
              <Button 
                disabled={!isBidValid()}
                onClick={() => createBid()}
                style={buttonStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                {`Submit Bid`}</Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};