import { Container, Row, Col, Button } from 'react-bootstrap'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Description } from '../components/Description'
import Type from '../components/Type'
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles'
// @ts-ignore
import heroImg from '../assets/heropic.webp'

export const LandingPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Request a Home Project Estimate</title>
        <meta
          name="description"
          content="Welcome to Schedule.builders. Discover an introduction to our services and access quick project estimates or schedule an appointment with ease."
        />
      </Helmet>
      <div className='landing'>
        <div className='hero'>
          <Container className='hero-section'>
            <Row>
              <Col className="clientIntro clientTypewriter mt-5" sm={7}>
                <h1><Type /></h1>
                <h2 className='clientHeroH2'>ready when you are.</h2>
                <p className='clientHeroParagraph'>In need of contractors for hire? We will present multiple companies tailored to your specific needs while making typical contract negotiations a thing of the past.</p>
                <div className='mt-5 clientHeroButtonContainer'>
                  <Button className="mx-2 clientHeroButtons" 
                          style={buttonStyle} 
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          href='/create-project' 
                          size="lg">Submit Project</Button>
                  <Button className="mx-2 clientHeroButtons"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          style={buttonStyle} 
                          href='/about' 
                          size="lg">About</Button>
                </div>
              </Col>
              <Col sm={5}>
                <img className='clientHeroImg' src={heroImg} alt="hero pic of home"></img>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='clientHeroDescription mb-5'>
          <Description />
        </div>
      </div>
    </HelmetProvider>
  )
}
