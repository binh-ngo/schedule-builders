import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Login } from '../components/Login';
import './pages.css'
export const RequestLogin = () => {
  return (
    <div className='request-login'>
    <Container>

      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6}>
          <div className="text-center">
            <h2 className=''>You must log in to view this page</h2>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Login />
      </Row>
    </Container>
    </div>
  );
}

