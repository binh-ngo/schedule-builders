import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ContactPage = () => {
  return (
    <div className='contact-page'>
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
  );
};

