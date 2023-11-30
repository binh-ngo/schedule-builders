import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Login } from '../components/Login';
import './pages.css'
export const RequestLogin = () => {
  return (
    <HelmetProvider>

      <div className='request-login'>
        <Helmet>
          <title>Login Required</title>
          <meta
            name="description"
            content="Access exclusive content and features by logging in. Please log in to continue and explore our offerings."
          />
        </Helmet>

        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} sm={8} md={6}>
              <div className="text-center">
                <h2 className='login-header'>Please log in </h2>
              </div>
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

