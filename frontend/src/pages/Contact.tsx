import { Container, Row, Col } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const ContactPage = () => {
  return (
    <HelmetProvider>

      <div className='contact-page'>
        <Helmet>
          <title>Contact Kalan</title>
          <meta
            name="description"
            content="Find Kalan's contact information on this page. Get in touch with ease."
          />
        </Helmet>
        <Container>
          <Row className="contact-content">
            <Col>
              <h1>Contact Us</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>If you have any questions or need assistance, please feel free to contact us:</p>
              <ul>
                <li>Phone: <a href="tel:+123456789">+1 (123) 456-789</a></li>
                <li>Email: <a href="mailto:contact@example.com">kalansestimates@gmail.com</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </HelmetProvider>
  );
};

