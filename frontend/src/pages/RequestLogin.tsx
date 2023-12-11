import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Login } from '../components/Login';
import './pages.css'
export const RequestLogin = () => {
  return (
    <HelmetProvider>
        <Helmet>
          <title>Login Required</title>
          <meta
            name="description"
            content="Access exclusive content and features by logging in. Please log in to continue and explore our offerings."
          />
        </Helmet>
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
    </HelmetProvider>
  );
}

