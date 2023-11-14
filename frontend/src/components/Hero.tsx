import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components.css'; 
// @ts-ignore
import hero from '../assets/hero.webp'

const Hero = () => {
    return (
        <Container className='hero-section mt-3'>
          <Row>
            <Col className="intro" lg={6}>
              <h1>Kalan's Estimates for Deck Repair & Remodeling Services</h1>
              <p> I am Kalan Dumadag, a dedicated professional located in the Seattle area, committed to providing top-quality services to our local community. If you're seeking to enhance your outdoor living space, we specialize in deck repair and remodeling. For a prompt estimate and to initiate the journey toward transforming your outdoor area, please complete the form below. When you're ready, schedule an appointment with us to experience our expert services.
              </p>
              <Button className="mx-2" href="/create-project" variant="success" size="lg">Get an Estimate</Button>
              <Button className="mx-2" href="/schedule-appointment" variant="primary" size="lg">Schedule an Appointment</Button>
            </Col>
            <Col lg={6} className="pt-5">
              <img src={hero} alt="default" />
            </Col>
          </Row>
          {/* <Row>
            <Col className="contractor-section" lg={12}>
              <h2>Calling All Contractors</h2>
              <p>Are you a contractor looking to access our estimates and collaborate with us? Sign up now and join our community of professionals. Gain exclusive access to our premium services and take your projects to the next level.</p>
              <Button className="mx-2" href="/contractor-signup" variant="info" size="lg">Sign Up as a Contractor</Button>
            </Col>
          </Row> */}
        </Container>
    );
  };
  
  export default Hero;
  