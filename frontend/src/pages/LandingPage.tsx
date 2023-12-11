import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Description } from '../components/Description'
import Type from '../components/Type'
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles'
// @ts-ignore
import heroImg from '../assets/heropic.webp'
import { IconBar } from '../components/IconBar'
import { useEffect, useState } from 'react'
import { PageLoading } from '../components/PageLoading'

export const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const totalImages = 1; // Change this based on the number of images to load
    const loadingTimeout = 3000; // Set a timeout of 5 seconds (adjust as needed)

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, loadingTimeout);

    if (imagesLoaded === totalImages) {
      clearTimeout(timeoutId); // Clear the timeout if all images are loaded
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    };
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(prevCount => prevCount + 1);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Request a Home Project Estimate</title>
        <meta
          name="description"
          content="Welcome to Schedule.builders. Discover an introduction to our services and access quick project estimates or schedule an appointment with ease."
        />
      </Helmet>
      {loading ? (
        <>
        <PageLoading />
        </>
      ) : (
        <div className='landing'>
        <div className='hero'>
          <Container className='hero-section'>
            <Row>
              <Col className="clientIntro clientTypewriter mt-5" sm={7}>
                <h1 className='loadingText'><Type /></h1>
                <h2 className='clientHeroH2'>ready when you are.</h2>
                <p className='clientHeroParagraph'>In need of contractors for hire? We will present multiple companies tailored to your specific needs while making typical contract negotiations a thing of the past.</p>
                <div className='mt-5 clientHeroButtonContainer'>
                  <Button className="mx-2 clientHeroButtons" 
                          style={buttonStyle} 
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          href='#projects' 
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
                <img className='clientHeroImg' 
                     src={heroImg} 
                     alt="hero pic of home"
                     onLoad={handleImageLoad}></img>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="projects">
          <IconBar />
        </div>
        <div className='clientHeroDescription mb-5'>
          <Description />
        </div>
      </div>
      )}
    </HelmetProvider>
  )
}
