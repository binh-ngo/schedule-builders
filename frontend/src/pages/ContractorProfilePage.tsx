import { Col, Container, Row } from 'react-bootstrap';

import { HiOutlineTrophy } from "react-icons/hi2";
import { RxStar } from "react-icons/rx";
import { PiMedal } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ddbGetContractorById } from '../graphql/contractors';
import { getContractorResponse } from '../types/types';
import moment from 'moment';

export const ContractorProfilePage = () => {
  const { contractorId } = useParams();
  const [contractor, setContractor] = useState<getContractorResponse | null>(null);

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        console.log(`Fetching contractor ${contractorId}`);
        const response = await ddbGetContractorById(contractorId ?? '');
        if (response) {
          setContractor(response);
        }
      } catch (error) {
        console.error('Error fetching contractor:', error);
      }
    };

    fetchContractor();
  }, [contractorId]);

  const removeParams = (url: string) => {
    return url.split('?')[0];
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm="6">
            <h1 className='mt-5'>{contractor?.company}</h1>
            <h6 className='my-4'>{contractor?.address} | {contractor?.city} | {contractor?.email} | {contractor?.phone}</h6>
            <p className="lh-lg">{contractor?.description}</p>
          </Col>
          <Col sm="6">
            <img
              src={removeParams(contractor?.imageUrl ?? '')}
              alt="Placeholder"
              className="img-fluid mt-5"
            />
            <p>Member since {moment(contractor?.createdAt).format('MMMM Do, YYYY')}</p>
          </Col>
        </Row>
      </Container>
      <Container className="py-5 description mb-5">
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