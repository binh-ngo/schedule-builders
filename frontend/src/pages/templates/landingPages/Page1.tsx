import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { HiOutlineTrophy } from "react-icons/hi2";
import { RxStar } from "react-icons/rx";
import { PiMedal } from "react-icons/pi";

// type Contractor = {
//   contractorName: string;
//   company: string;
//   specialty: string;
//   address: string;
//   city: string;
//   email: string;
//   imageUrl: string;
//   phone: string;
//   rating: number;
//   createdAt: string;
//   description: string;
// }

export const Page1 = () => {
  return (
    <>
<Container className="mt-5">
      <Row>
        <Col sm="6">
          <h1 className='mt-5'>Welcome to Your Website</h1>
          {/* <h1>{props.company}</h1> */}
          <h6 className='my-4'>123 North Street | Seattle | contractor@email.com | 123-123-1234</h6>
          {/* <h6 className='my-4'>{`${props.address} | ${props.city} | ${props.email} | ${props.phone}`}</h6> */}
          <p className="lh-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi beatae amet, delectus molestiae, quis ab iste sint, incidunt cumque eveniet at. Ipsa optio maxime labore perferendis obcaecati commodi ullam suscipit?</p>
          {/* <p>{props.description}</p> */}
          <Button style={{ backgroundColor: '#164863' }}>Request Estimate</Button>
          {/* <Button href={`contractor/${contractor}/form`} style={{ backgroundColor: '#164863' }}>Request Estimate</Button> */}
        </Col>
        <Col sm="6">
          <img
            src="https://via.placeholder.com/400"
            // src={props.imageUrl}
            alt="Placeholder"
            className="img-fluid mt-5"
          />
          <p>Member since 2003</p>
          {/* <p>{props.createdAt}</p>  */}
        </Col>
      </Row>
    </Container>  
      <Container className="py-5 description mb-5" style={{}}>
      <Row className="justify-content-around">
        {/* Panel 1 */}
        <Col md={4} className="text-center descriptionBlock">
          <HiOutlineTrophy size={50} color="#164863" />
          <h3 className="my-3">201</h3>
          <p>
            Successful Projects
          </p>
        </Col>

        {/* Panel 2 */}
        <Col md={4} className="text-center descriptionBlock">
          <RxStar size={50} color="#427D9D" />
          <h3 className="my-3">4.5/5</h3>
          <p>
            Rating
          </p>
        </Col>

        {/* Panel 3 */}
        <Col md={4} className="text-center descriptionBlock">
          <PiMedal size={50} color="#9BBEC8" />
          <h3 className="my-3">24</h3>
          <p>
            Projects in your neighborhood
          </p>
        </Col>
      </Row>
    </Container>        
    </>
    )
}
