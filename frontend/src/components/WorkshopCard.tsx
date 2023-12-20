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
import { Carousel } from 'react-bootstrap'
import { WorkshopCardProps } from '../types/types'
import { ddbCreateBid } from '../graphql/bids'
import { Link } from 'react-router-dom'

export const WorkshopCard = (props: WorkshopCardProps) => {
  const [bid, setBid] = useState(0);

  const handleCreateBid = async (projectId: string) => {
    if (bid) {
      console.log('Bid is being processed.')
    }
    const bidInput = {
      projectId,
      bidAmount: bid,
      contractorName: props.username ?? '',
      contractorId: props.contractorId ?? ''
    }
    // console.log(bidInput);
    let newBid = null;
    const response = await ddbCreateBid(bidInput);
    if('data' in response) {
      newBid = response.data.createBid;
      // console.log(`Response from DynamoDB: ${JSON.stringify(newBid)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    } if (newBid) {
      console.log("Project successfully created")
    } else {
      console.log("onSave called but title or children are empty");
    }
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
      <Card className="workshopCard my-3">
        <Row>
          <Col md={12} lg={4}>
            <Carousel interval={null} >
              {props.imageUrls ? (
                props.imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <Card.Img className="workshopCardImg" src={removeParams(imageUrl)} alt="project image" />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <Card.Img src={defaultImage} alt="default image" />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
          <Col md={12} lg={5} className='workshopCardBody'>
            <Card.Body>
            <Link to={`/projects/${props.projectId}`}>
              <Card.Title className="workshopCardTitle">{props.projectType}</Card.Title>
              </Link>              <Card.Text>
                <strong>Description:</strong> {props.description}
              </Card.Text>
              {props.material && (
                <Card.Text>
                  <strong>Material:</strong> {props.material}
                </Card.Text>
              )}
              {props.projectSize && (
                <Card.Text>
                  <strong>Project Size:</strong> {props.projectSize} sqft
                </Card.Text>
                )
              } 
              <Card.Text>
                <strong>Early Estimate:</strong> ${props.earlyEstimate}
              </Card.Text>
              <Card.Text>
                <strong>Start Date:</strong> {moment(props.startDate).format('MMMM Do, YYYY')}
              </Card.Text>
              <Card.Text>
                <strong>End Date:</strong> {moment(props.endDate).format('MMMM Do, YYYY')}
              </Card.Text>
              <Card.Text>
                <strong>Created At:</strong> {moment(props.createdAt).format('MMMM Do, YYYY h:mm a')}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col md={12} lg={3} className='bidSection'>
            <div className="bidInputSection">
            <Form.Label className="bidLabel">
              $
              </Form.Label>
            <Form.Control
              type="text"
              id={`Bid-${props.projectId}-input`}
              className="bg-transparent bidInput"
              aria-describedby={`Bid-${props.projectId}-input`}
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
              </div>
            <Button
              disabled={!isBidValid()}
              onClick={() => handleCreateBid(props.projectId ?? '')}
              style={buttonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {`Submit Bid`}</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};