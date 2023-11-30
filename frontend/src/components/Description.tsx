import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaRegUserCircle, FaWpforms } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";

export const Description = () => {
  return (
<Container className="py-5 description" style={{}}>
    <h3 className='mb-5'>How it works</h3>
      <Row className="justify-content-around">
        {/* Panel 1 */}
        <Col md={4} className="text-center descriptionBlock">
          <FaRegUserCircle size={50} color="#164863" />
          <h3>Submit info</h3>
          <p>
            Create a profile so we can get you in contact with potential clients!
          </p>
        </Col>

        {/* Panel 2 */}
        <Col md={4} className="text-center descriptionBlock">
          <FaWpforms size={50} color="#427D9D" />
          <h3>Customize form</h3>
          <p>
            Tailor your form to receive additional information if necessary, and bid on verified projects on our auction page.
          </p>
        </Col>

        {/* Panel 3 */}
        <Col md={4} className="text-center descriptionBlock">
          <LiaUsersSolid size={50} color="#9BBEC8" />
          <h3>Relax</h3>
          <p>
            Do what you do best, we'll handle the rest.
          </p>
        </Col>
      </Row>
    </Container>  
    )
}

