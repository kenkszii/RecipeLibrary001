import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row>
          <Col>
            <p>© 2023 @kenkszii</p>
          </Col>
          <Col className="text-right">
            <p>Privacy Policy | Terms of Service</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
