import { Col, Row, Container } from 'react-bootstrap';
import { Login } from '../components/Login';
import './pages.css'
export const RequestLogin = () => {
  return (

      <div className='request-login'>

        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} sm={8} md={6}>
                <h2 className='login-header text-center'>Please log in </h2>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Login />
          </Row>
        </Container>
      </div>
  );
}

