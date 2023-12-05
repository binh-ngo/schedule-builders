import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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
                          href='/create-contractor' 
                          size="lg">Sign up!</Button>
                  <Button className="mx-2 heroButtons"
                          style={buttonStyle}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          href='/pro/create-form' 
                          size="lg">Try it out!</Button>
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
                <h3>Submit info</h3>
                <p>
                  Create a profile so we can get you in contact with potential clients!
                </p>
              </Col>

              {/* Panel 2 */}
              <Col md={4} className="text-center descriptionBlock">
                <BsBuildings size={50} color="#427D9D" />
                <h3>Customize form</h3>
                <p>
                  Tailor your form to receive additional information if necessary, and bid on verified projects in our Workshop.
                </p>
              </Col>

              {/* Panel 3 */}
              <Col md={4} className="text-center descriptionBlock">
                <CiSearch size={50} color="#9BBEC8" />
                <h3>Relax</h3>
                <p>
                  We know that running your business and marketing can be a lot to handle. Do what you do best, we'll handle the rest.
                </p>
              </Col>
            </Row>
          </Container>          
          </div>
      </div>
    </HelmetProvider>
  )
}
