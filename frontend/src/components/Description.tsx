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
          <FaRegUserCircle size={50}/>
          <h3 className='my-3'>Submit info</h3>
          <p>
            Create a project with your desired timeframe so we can get you in contact with potential contractors!
          </p>
        </Col>

        {/* Panel 2 */}
        <Col md={4} className="text-center descriptionBlock">
          <FaWpforms size={50}/>
          <h3 className='my-3'>Post to Workshop</h3>
          <p>
            If you're ready, your project will be available in the contractor Marketplace. You also have the option to answer additional questions to receive a more exact estimate.
          </p>
        </Col>

        {/* Panel 3 */}
        <Col md={4} className="text-center descriptionBlock">
          <LiaUsersSolid size={50}/>
          <h3 className='my-3'>Choose Your Contractor</h3>
          <p>
            After viewing all the bids on your project, make the executive decision and choose the right contractor for you.
          </p>
        </Col>
      </Row>
    </Container>  
    )
}

