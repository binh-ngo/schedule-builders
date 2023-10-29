import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components.css'; 
// @ts-ignore
import portrait from '../assets/portrait.webp'

const Hero = () => {
    return (
        <Container className='hero-section mt-3'>
          <Row>
            <Col lg={6}>
              <h1>Kalan's Estimates for Deck Repair & Remodeling Services</h1>
              <p> My name is Kalan Dumadag. I am based in the Seattle area and I am focusing my time on serving the local people. 
                You can fill out my form below to get a quick estimate, and when you're ready, schedule an appointment
                so we can take the first steps to transform your outdoor space with our professional deck repair and remodeling services. 
              </p>
              <Button className="mx-2" href="/create-project" variant="success" size="lg">Get an Estimate</Button>
              <Button className="mx-2" href="/schedule-appointment" variant="primary" size="lg">Schedule an Appointment</Button>
            </Col>
            <Col lg={6}>
              <img src={portrait} alt="default" />
            </Col>
          </Row>
        </Container>
    );
  };
  
  export default Hero;
  