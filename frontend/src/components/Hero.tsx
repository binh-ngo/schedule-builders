import { Container, Row, Col, Button } from 'react-bootstrap';
import './components.css'; 
import Type from './Type';
// @ts-ignore
import hero from '../assets/heropic.webp';

type HeroProps = {
  h2: string;
  paragraph: string;
  button1Href: string;
  button1Text: string;
  button2Href?: string;
  button2Text?: string;
}

const Hero = (props: HeroProps) => {

  return (
        <Container className='hero-section'>
          <Row>
            <Col className="intro typewriter mt-5" sm={7}>
              <img className='contractorHeroImg'src={hero} alt="hero pic of home"></img>
              <h1><Type /></h1>
              <h2 className='heroH2'>{props.h2}</h2>
              <p className='heroParagraph'>{props.paragraph}</p>
              <div className='mt-5 heroButtonContainer'>
              <Button className="mx-2 heroButtons bg-black" href={props.button1Href} size="lg">{props.button1Text}</Button>
              <Button className="mx-2 heroButtons bg-black" href={props.button2Href} size="lg">{props.button2Text}</Button>
              </div>
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
  