import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { ddbGetAllClients } from '../graphql/clients';

export const ClientProfilePage = () => {
  const { clientName } = useParams();

  const [clientId, setClientId] = useState("");

  // useEffect(() => {
  //   const fetchClient = async () => {
  //     const response = await ddbGetAllClients();
  //     for(let i=0; i < response.length; i++) {
  //       if (clientName === response[i].clientName) {
  //         setClientId(response[i].clientId);
  //       }
  //     }
  //   }
  //   fetchClient();
  // }, [clientName]);

  return (
    <Container className='hero-section'>
    <Row>
      <Col className="intro typewriter" sm={7}>
        <h1>Welcome!</h1>
        <p className='heroParagraph'>We value the privacy of your information so we will only send it out when you're ready. Are you trying to get this product done sooner? Provide further information
        by clicking on the button below and it will expedite your project request whenever you're ready.</p>
        <div className='mt-5'>
        {/* <Button className="mx-2" style={{ backgroundColor: '#164863' }} href="#" size="lg">I'm Ready!</Button> */}
        <Button className="mx-2" style={{ backgroundColor: '#164863' }} href="#" size="lg">Provide Information</Button>
        </div>
      </Col>
      <Col sm={5} className="mt-5">
      <Card>
      <Card.Body>
        <Card.Title>Example Name</Card.Title>
        {/* <Card.Title>{clientName}</Card.Title> */}
        <Card.Subtitle className="mb-2 text-muted">Client Phone: 123-123-1234</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Email: example@email.com</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Address: 123 North Street</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">City: Seattle</Card.Subtitle>

        <Card.Text>
          <strong>Description:</strong> I want to reconstruct my deck!
        </Card.Text>
        <Card.Text>
          <strong>Material:</strong> Cedar
        </Card.Text>
        <Card.Text>
          <strong>Project Size:</strong> Large: 400 sq ft
        </Card.Text>
        <Card.Text>
          <strong>Project Type:</strong> Residential
        </Card.Text>
        <Card.Text>
          <strong>Desired Completion Time:</strong> 2 Weeks
        </Card.Text>
        <Card.Text>
          <strong>Created At:</strong> 11/21/23
        </Card.Text>
      </Card.Body>
    </Card>
      </Col>
    </Row>
  </Container>  
  )
}
