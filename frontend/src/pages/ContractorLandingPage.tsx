import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Hero from '../components/Hero'

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
          <Hero h2="let's work together!"
            paragraph='Looking to get more jobs? Sign up or create your own customizable form above and we will work on getting you noticed!'
            img='hero2.webp'
            button1Href='/create-contractor'
            button1Text='Sign up!'
            button2Href='/contractor/create-form'
            button2Text='Try it out!' />
        </div>
        <div className='heroDescription mb-5'>
          <Container className="py-5 description" style={{}}>
            <h3 className='mb-5'>How it works</h3>
            <Row className="justify-content-around">
              {/* Panel 1 */}
              <Col md={4} className="text-center descriptionBlock">
                {/* <FaRegUserCircle size={50} color="#164863" /> */}
                <h3>Submit info</h3>
                <p>
                  Create a profile so we can get you in contact with potential clients!
                </p>
              </Col>

              {/* Panel 2 */}
              <Col md={4} className="text-center descriptionBlock">
                {/* <FaWpforms size={50} color="#427D9D" /> */}
                <h3>Customize form</h3>
                <p>
                  Tailor your form to receive additional information if necessary, and bid on verified projects on our auction page.
                </p>
              </Col>

              {/* Panel 3 */}
              <Col md={4} className="text-center descriptionBlock">
                {/* <LiaUsersSolid size={50} color="#9BBEC8" /> */}
                <h3>Relax</h3>
                <p>
                  Do what you do best, we'll handle the rest.
                </p>
              </Col>
            </Row>
          </Container>          </div>
      </div>
    </HelmetProvider>
  )
}
