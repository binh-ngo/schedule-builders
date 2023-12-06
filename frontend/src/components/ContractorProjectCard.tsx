import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'

type ContractorProjectProps = {
    material: string;
    description: string;
    projectType: string;
    propertyType: string;
    projectSize: string;
    city: string;
    imageUrls: string[] | undefined;
}

export const ContractorProjectCard = (project: ContractorProjectProps) => {
    const removeParams = (url: string) => {
        return url.split('?')[0];
      }
    
    return (
<div>
      <div className='card-container'>

        <Card className="project-card">
          <Carousel interval={null} >
            {project.imageUrls ? (
              project.imageUrls.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                  <Card.Img variant="top" src={removeParams(imageUrl)} className="card-img-responsive" />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <Card.Img variant="top" src={defaultImage} alt="default image" className="card-img-responsive" />
              </Carousel.Item>
            )}
          </Carousel>
          <Card.ImgOverlay>
            <div className="card-content bg-light">
              <Card.Title>{`${project.city}`}</Card.Title>
              <Card.Text>
                {`Service: "${project.projectType}" made with "${project.material}".`}
              </Card.Text>
              <Card.Text>
                {`${project.propertyType} | ${project.projectSize}`}
              </Card.Text>
              </div>

              
          </Card.ImgOverlay>
        </Card>
      </div>

    </div>    
    )
}
