import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year}</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          </Col>
      </Row>
    </Container>
  );
}

