import { Container, Col, Row, Card } from 'react-bootstrap';
import { HelmetProvider, Helmet } from 'react-helmet-async'
// @ts-ignore
import about1 from '../assets/about1.webp'
// @ts-ignore
import about2 from '../assets/about2.webp'
// @ts-ignore
import choose from '../assets/choose.webp'
// @ts-ignore
import form from '../assets/form.webp'
// @ts-ignore
import money from '../assets/money.webp'

export const AboutPage = () => {
    return (
    <HelmetProvider>
        <Helmet>
            <title>About Us</title>
            <meta name="description" content="Discover our core values and mission statement." />
      </Helmet>
    <Container className="aboutPage">
    <Row>
      <Col>
        <h1>About Us</h1>
      </Col>
    </Row>

    <Row className="mt-4">
      <Col>
        <Card>
            <Card.Img variant="top" src={about1} />
          <Card.Body className="cardBody">
            <Card.Title>Purpose</Card.Title>
            <Card.Text>
              Our purpose is to simply connect clients and contractors. No time or money wasted through unreliable leads, just quality leads you can trust. 
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card>
        <Card.Img variant="top" src={about2} />
          <Card.Body className="cardBody">
            <Card.Title>Our Mission</Card.Title>
            <Card.Text>
              Our mission is to be an essential partner for the client and contractor by making project negotiations obsolete.
              Contractors will request the money they deserve, and clients will receive assistance every step of the 
              way to make their decision. 
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>  
  <Container className="py-5 description mb-5">
    <h3 className='mb-5'>How it works</h3>
      <Row className="justify-content-around">
        {/* Panel 1 */}
        <Col md={4} className="text-center descriptionBlock">
          <img src={form} alt='form icon' style={{"width": "100px", "height": "auto"}}/>
          <h3>Submit Project Details</h3>
          <p>
            Describe your project so we can get you in contact with potential contractors!
          </p>
        </Col>

        {/* Panel 2 */}
        <Col md={4} className="text-center descriptionBlock">
          <img src={choose} alt='choose contractor icon' style={{"width": "100px", "height": "auto"}}/>
          <h3>Receive Bids</h3>
          <p>
            We will tailor prospective contractors to your needs whenever you're ready and they will give competitive prices for your job.
          </p>
        </Col>

        {/* Panel 3 */}
        <Col md={4} className="text-center descriptionBlock">
          <img src={money} alt='give money icon' style={{"width": "100px", "height": "auto"}} />
          <h3>Select Contractor</h3>
          <p>
            After analyzing all the prospects, you can choose a contractor who will be ready to work during the time period you choose.
          </p>
        </Col>
      </Row>
    </Container>  
    </HelmetProvider>
    )
}
