import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Type from '../components/Type'
// @ts-ignore
import contractorHero from '../assets/hero2.webp'
import { BsBuildings } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { CiSearch } from "react-icons/ci";
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles'
export const ContractorLandingPage = () => {

  return (
    <HelmetProvider>
      <div className='landing'>
        <Helmet>
          <title>Sign up and Create a Personalized Form</title>
          <meta
            name="description"
            content="Welcome to the Schedule.builders contractor landing page. Discover an introduction to our services and business plan to grow your online presence and customer base."
          />
        </Helmet>
        <div className='hero'>
          <Container className='hero-section'>
            <Row>
              <Col className="intro contractorTypewriter mt-5" sm={7}>
                <img className='contractorHeroImg' src={contractorHero} alt="contractor hero"></img>
                <h1><Type /></h1>
                <h2 className='contractorHeroH2'>let's work together!</h2>
                <p className='contractorHeroParagraph'>Looking to get more jobs? Sign up or create your own customizable form above and we will work on getting you noticed!</p>
                <div className='mt-5 heroButtonContainer'>
                  <Button className="mx-2 heroButtons"
                          style={buttonStyle}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          href='/join-waitlist' 
                          size="lg">Sign up!</Button>
                  {/* <Button className="mx-2 heroButtons"
                          style={buttonStyle}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          href='/pro/create-form' 
                          size="lg">Try it out!</Button> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='contractorHeroDescription mb-5'>
          <Container className="py-5 description">
            <h3 className='mb-5'>How it works</h3>
            <Row className="justify-content-around">
              {/* Panel 1 */}
              <Col md={4} className="text-center descriptionBlock">
                <FaRegUserCircle size={50} color="#164863" />
                <h3 className="my-3">Submit Info</h3>
                <p className='descriptionText'>
                  Sign up for our waitlist and await verification from our team.
                </p>
              </Col>

              {/* Panel 2 */}
              <Col md={4} className="text-center descriptionBlock">
                <CiSearch size={50} color="#427D9D" />
                <h3 className="my-3">Browse</h3>
                <p className='descriptionText'>
                  You now have access to our <strong>Workshop</strong>, where you can view many types of projects in the Seattle area. 
                </p>
              </Col>

              {/* Panel 3 */}
              <Col md={4} className="text-center descriptionBlock">
                <BsBuildings size={50} color="#9BBEC8" />
                <h3 className="my-3">Secure Projects</h3>
                <p className='descriptionText'>
                  Give your potential clients your best price and availability for the project and secure the job for your company! 
                </p>
              </Col>
            </Row>
          </Container>          
          </div>
      </div>
    </HelmetProvider>
  )
}
