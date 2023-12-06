import { Container, Row, Col } from 'react-bootstrap'
import { GiLockedChest } from "react-icons/gi";
import { PiTreeEvergreenBold } from "react-icons/pi";
import { FaFaucetDrip } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { MdOutlineDeck, MdRoofing } from "react-icons/md";
import { Link } from 'react-router-dom';
import { iconBarCaptionStyle } from './styles';

export const IconBar = () => {
  return (
    <Container className="py-5 iconBar">
      <h3 className='mb-5'>Let us help</h3>
      <Row>
        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/handyperson">
            <GiLockedChest size={35} style={{ 'color': '#654321' }} />
            <p className="my-3">Handyperson</p>
          </Link>
        </Col>

        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/landscaping">
            <PiTreeEvergreenBold size={35} style={{ 'color': '#018749' }} />
            <p className="my-3">Landscaping</p>
          </Link>
        </Col>

        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/plumbing">
            <FaFaucetDrip size={35} style={{ 'color': '#214365' }} />
            <p className="my-3">Plumbing</p>
          </Link>
        </Col>

        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/electrical">
            <FaRegLightbulb size={35} style={{ 'color': '#CCCC00' }} />
            <p className="my-3">Electrical</p>
          </Link>
        </Col>

        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/deck">
            <MdOutlineDeck size={35} style={{ 'color': 'orange' }} />
            <p className="my-3">Deck Building</p>
          </Link>
        </Col>

        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/remodel">
            <LuPencilRuler size={35} style={{ 'color': 'grey' }} />
            <p className="my-3">Remodeling</p>
          </Link>
        </Col>

        <Col className="text-center descriptionBlock">
          <Link style={iconBarCaptionStyle} to="/create-project/roofing">
            <MdRoofing size={35} style={{ 'color': 'red' }} />
            <p className="my-3">Roofing</p>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
