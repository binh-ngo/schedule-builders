import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components.css'; 
import Type from './Type';
// @ts-ignore
import hero2 from '../assets/hero2.webp'

const Hero = () => {
    return (
        <Container className='hero-section'>
          <Row>
            <Col className="intro typewriter" sm={7}>
              <h1><Type /></h1>
              <h2>ready when you are.</h2>
              <p className='heroParagraph'>Looking to get more jobs? Sign up or create your own customizable form above and we will work on getting you noticed!</p>
              <div className='mt-5'>
              <Button className="mx-2" style={{ backgroundColor: '#164863' }} href="/create-contractor" variant="primary" size="lg">Sign up</Button>
              <Button className="mx-2" style={{ backgroundColor: '#427D9D' }} href="/create-form" variant="secondary" size="lg">Try it out!</Button>
              </div>
            </Col>
            <Col sm={5} className="heroImg">
              <img src={hero2} alt="hero home"/>
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
  