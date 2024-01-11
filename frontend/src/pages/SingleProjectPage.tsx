import { Col, Form, Container, Row, Carousel, Card, Button, Tabs, Tab, Modal } from 'react-bootstrap';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ddbGetProjectById, ddbPublishProject, ddbUpdateProject } from '../graphql/projects';
import { Link, useParams } from 'react-router-dom';
import { BidInput, ddbGetAllQueryResponse, Message, ProjectProps } from '../types/types';
// @ts-ignore
import defaultImage from '../assets/defaultimage.jpg'
import moment from 'moment';
import { ddbCreateBid, ddbGetAllBids } from '../graphql/bids';
import { ddbGetAllContractors } from '../graphql/contractors';
import { AccountContext } from '../Accounts';
import { ddbCreateMessage, ddbGetAllMessages } from '../graphql/messages';

interface FormData {
  imageUrls: File[] | undefined;
}

export const SingleProjectPage = () => {
  const { projectId } = useParams();
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [] as File[],
  });
  const [project, setProject] = useState<ddbGetAllQueryResponse | null>(null);
  const [selectedTab, setSelectedTab] = useState("uploadImages");
  const [selectedMessageTab, setSelectedMessageTab] = useState("");
  const [bids, setBids] = useState([]);
  const [bidMin, setBidMin] = useState(0);
  const [bidMax, setBidMax] = useState(0);
  const [bidAverage, setBidAverage] = useState(0);
  const [username, setUsername] = useState('');
  const [bid, setBid] = useState(0);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [contractorId, setContractorId] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [messages, setMessages] = useState([]);
  const [showPublishConfirmation, setShowPublishConfirmation] = useState(false);
  
  const { getCurrentAuthedUser } = useContext(AccountContext);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log(`Fetching project ${projectId}`);
        const response = await ddbGetProjectById(projectId ?? '');
        if (response) {
          setProject(response);
        }
        const messageData = await ddbGetAllMessages(projectId ?? '');
        if (messageData) {
          setMessages(messageData);
          console.log(messageData)
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchBids = async () => {
      console.log(`fetching bids for project ${project?.projectId}`)
      const response = await ddbGetAllBids(project?.projectId ?? '');
      setBids(response);
    };
    fetchBids();
  }, [project?.projectId]);

  useEffect(() => {
    getBidData(bids);
  }, [bids]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getCurrentAuthedUser();
        // console.log('USERNAME BEFORE', user.username)
        setUsername(user.username);
        // console.log('USERNAME AFTER', username)
        const resp = await ddbGetAllContractors();
        for (let i = 0; i < resp.length; i++) {
          const emailPart = resp[i].email ? resp[i].email.split("@")[0] : '';
          // console.log('EMAILPART', emailPart);
          // console.log('CONTRACTORID', resp[i].contractorId)
          // console.log('CONTRACTORNAME', resp[i].contractorName)
          if (emailPart === username) {
            setContractorId(resp[i].contractorId);
            setContractorName(resp[i].contractorName);
            // console.log(`Contractor ID: ${emailPart} stored`)
            // console.log(`Contractor NAME: ${resp[i].contractorName} stored`)
          } else {
            console.log('User is not a contractor!')
          }
        }
      } catch (error) {
        console.error('Error getting Cognito user:', error);
      }
    }
    fetchUserData();
  }, [username]);

  const handleShowPublishConfirmation = () => setShowPublishConfirmation(true);
  const handleClosePublishConfirmation = () => setShowPublishConfirmation(false);


  const renderMessagesTab = (data: Message[]) => {

    const sortedMessages = data.sort(
      (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
    );
  
    return (
      <div className="messageTabSection">
        {sortedMessages.map((message: Message, index: number) => (
          <div key={index} className="messageBox">
            <Link className="messageAuthor" to={`/pro/${message.authorName}`}>
              <h6 className='messageAuthor'>{message.authorName}</h6>
            </Link>
            <p className="text">
              {message.body}
            </p>
            <Card.Subtitle className="messageDate">{moment(message.createdAt).format('MM/DD/YY')}</Card.Subtitle>
          </div>
        ))}
        <div className="sendMessageButtonContainer">
                    <Form.Control
                      as="textarea"
                      type="text"
                      id={`Reply-${projectId}-input`}
                      className="bg-transparent"
                      aria-describedby={`Reply-${projectId}-input`}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <Button
                      className="sendMessageButton"
                      onClick={() => handleCreateMessage(projectId ?? '')}
                      style={buttonStyle}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      Reply
                    </Button>
                  </div>
      </div>
    );
  };

  const renderAuthorsTab = (data: Message[]) => {
    const uniqueAuthors = getUniqueAuthors(data);

    return (
      <Tabs
      defaultActiveKey={selectedMessageTab}
      onSelect={(key) => setSelectedMessageTab(key as string)}
      transition={false}
      id="author-tabs"
      className="mb-3"
    >
      {uniqueAuthors.map((author, index) => (
        <Tab key={index} eventKey={author} title={author}>
          {renderMessagesTab(data)}
        </Tab>
      ))}
    </Tabs>
  );
};

// change to get unique threads in project
  function getUniqueAuthors(messages: Message[]): string[] {
    const uniqueAuthors: string[] = [];
  
    messages.forEach((message) => {
      if (message.authorName && !uniqueAuthors.includes(message.authorName)) {
        uniqueAuthors.push(message.authorName);
      }
    });
    return uniqueAuthors;
  }

  const handleCreateMessage = async (projectId: string) => {
    if (message) {
      console.log('Message is being processed.')
    }
    const messageInput = {
      projectId,
      body: message,
      authorId: contractorId,
      authorName: contractorName
    }
    let newMessage = null;
    const response = await ddbCreateMessage(messageInput);
    if ('data' in response) {
      newMessage = response.data.createMessage;
      // console.log(`Response from DynamoDB: ${JSON.stringify(newMessage)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    } if (newMessage) {
      console.log("Message successfully created")
    } else {
      console.log("onSave called but title or children are empty");
    }
  }
  const handleCreateBid = async (projectId: string) => {
    if (bid) {
      console.log('Bid is being processed.')
    }
    const bidInput = {
      projectId,
      bidAmount: bid,
      contractorName: username ?? '',
      contractorId: contractorId ?? ''
    }
    // console.log(bidInput);
    let newBid = null;
    const response = await ddbCreateBid(bidInput);
    if ('data' in response) {
      newBid = response.data.createBid;
      // console.log(`Response from DynamoDB: ${JSON.stringify(newBid)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    } if (newBid) {
      console.log("Project successfully created")
    } else {
      console.log("onSave called but title or children are empty");
    }
  }

  const isBidValid = () => {
    const valid = bid !== 0;

    return valid;
  };

  const isMessageValid = () => {
    const valid = message !== '';

    return valid;
  };

  const getBidData = (bidData: BidInput[]) => {
    if (bidData.length === 0) {
      setBidMin(0);
      setBidMax(0);
      setBidAverage(0);
      return;
    }
    let min = bidData[0].bidAmount;
    let max = bidData[0].bidAmount;
    let sum = bidData[0].bidAmount;
    for (let i = 1; i < bidData.length; i++) {
      const bidAmount = bidData[i].bidAmount;
      if (bidAmount < min) {
        min = bidAmount;
      }
      if (bidAmount > max) {
        max = bidAmount;
      }
      sum += bidAmount;
    }
    const average = sum / bidData.length;
    setBidMin(min);
    setBidMax(max);
    setBidAverage(average);
  };

  const removeParams = (url: string) => {
    return url.split('?')[0];
  }


  const handlePublish = async (projectId: string) => {
    console.log(projectId);
    try {
      const response = await ddbPublishProject(projectId, true);
      // console.log(response);
      handleShowPublishConfirmation(); 
    } catch (err) {
      console.log(`err: ${JSON.stringify(err, null, 2)}`);
    }
  }

  const handleUnpublish = async (projectId: string) => {
    console.log(projectId);
    try {
      const response = await ddbPublishProject(projectId, false);
      // console.log(response);
    } catch (err) {
      console.log(`err: ${JSON.stringify(err, null, 2)}`);
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList | null;

    if (files !== null) {
      const updatedImageUrls = [...formData.imageUrls!, ...Array.from(files)];
      setFormData({ ...formData, imageUrls: updatedImageUrls });
      console.log(`IMAGES: ${updatedImageUrls}`);
    }
  };

  const updateImages = async (project: ProjectProps, e: React.FormEvent) => {
    e.preventDefault();
    if (formData.imageUrls) {
      console.log('Images submitted:', formData);

      const projectInput = {
        imageUrls: formData.imageUrls || undefined,
        projectId: project.projectId
      }

      let updatedProject = null;
      const response = await ddbUpdateProject(projectInput);
      if ('data' in response) {
        updatedProject = response.data.updateProject;
        // console.log(`Response from DynamoDB: ${JSON.stringify(updatedProject)}`);
      } else {
        console.error('Response is not a GraphQL result:', response);
      } if (updatedProject) {
        console.log("Images successfully uploaded")
        // console.log(updatedProject.imageUrls)
        const uploadUrls = updatedProject.imageUrls;
        for (let i = 0; i < uploadUrls.length; i++) {
          fetch(uploadUrls[i], {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: formData.imageUrls[i]
          })
        }
      } else {
        console.log("onSave called but no images provided");
      }
    }
  };

  const projectOwner = project?.email ? project.email.split('@')[0] : '';

  // console.log(`username ----- ${username}`)
  // console.log(`projectOwner ----- ${projectOwner}`)

  return (
    <>
      <Container className='projectPage'>
        <Row>
          <Col sm={4}>
            <h1 className='my-3'> {project?.projectType ?? ''}</h1>
            <h3 className='mb-5'> {project?.clientName} | {project?.city}</h3>
            <h5><strong>Description: </strong> {project?.description}</h5>
            {project?.material && (
              <h5><strong>Material: </strong> {project?.material}</h5>
            )}
            {project?.projectSize && (
              <h5><strong>Project Size: </strong>{project?.projectSize}</h5>
            )}
            <h5><strong>Availability: </strong> {moment(project?.startDate).format('MM/DD/YYYY')} - {moment(project?.endDate).format('MM/DD/YY')}</h5>
            <h5><strong>Early Estimate: </strong> ${project?.earlyEstimate}</h5>
            <h5><strong>Created On: </strong> {moment(project?.createdAt).format('MM/DD/YY')}</h5>
            {username !== projectOwner && (
              <Row>
                <Col sm={6} className='bidSection'>
                  <div className="bidInputSection">
                    <Form.Label className="bidLabel">
                      $
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id={`Bid-${projectId}-input`}
                      className="bg-transparent bidInput"
                      aria-describedby={`Bid-${projectId}-input`}
                      value={bid === 0 ? '' : bid}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (!isNaN(newValue)) {
                          setBid(newValue);
                        } else {
                          setBid(0);
                        }
                      }}
                    />
                  </div>
                  <Button
                    disabled={!isBidValid()}
                    onClick={() => handleCreateBid(projectId ?? '')}
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Submit Bid</Button>
                </Col>
                <Col sm={6} className="bidSection">
                  <Form.Label className='messageLabel'>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    id={`Message-${projectId}-input`}
                    className="bg-transparent messageInput"
                    aria-describedby={`Message-${projectId}-input`}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />
                  <Button
                    disabled={!isMessageValid()}
                    onClick={() => handleCreateMessage(projectId ?? '')}
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Send</Button>
                </Col>
              </Row>
            )}
          </Col>

          <Col sm="4">
            <Carousel interval={null} >
              {project?.imageUrls ? (
                project?.imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index}>
                    <Card.Img className="projectImage" src={removeParams(imageUrl)} alt="project image" />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <Card.Img src={defaultImage} alt="default image" />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
          {username === projectOwner && (
            <Col sm="4" className="messageSection">
              {renderAuthorsTab(messages)}
            </Col>
          )}
        </Row>
        {username === projectOwner && (
          <Col sm="8">
            <Tabs
              defaultActiveKey={selectedTab}
              onSelect={(key) => setSelectedTab(key as string)}
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
            >
              <Tab eventKey="uploadImages" title="Manage Project">
                <form className="image-form mt-5" encType='multipart/form-data'>
                  <div className="mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      name="imageUrl"
                      multiple
                      onChange={handleImageChange}
                    />
                    {formData.imageUrls !== null ? (
                      <p>Selected Image Count: {formData.imageUrls ? formData.imageUrls.length : 0}</p>
                    ) : (
                      <p>No Image Selected</p>
                    )}
                  </div>
                  <div className="imageButtons">
                  <Button
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={(e) => updateImages(project!, e)}
                  >
                    {project?.imageUrls ? `Change Pictures` : `Upload`}
                  </Button>
                  {project?.isPublished === true ? (
                    <Button
                      // unpublish post
                      onClick={() => handleUnpublish(project?.projectId ?? '')}
                      style={buttonStyle}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      Remove from Workshop
                    </Button>
                  ) : (
                    <Button
                    // publish post
                    onClick={() => handlePublish(project?.projectId ?? '')}
                    style={buttonStyle}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      >
                      Send to Contractors
                    </Button>
                  )}
                  </div>
                </form>
              </Tab>
              <Tab eventKey='bidInfo' title="Bid Information">
                {bids.length > 1 &&
                  <>
                    <Card.Text>
                      <strong>Bid Range:</strong> {bidMin} - {bidMax}
                    </Card.Text>
                    <Card.Text>
                      <strong>Average Bid:</strong> {bidAverage}
                    </Card.Text>
                  </>
                }
                <Card.Title className="clientProjectCardTitle">Current Bids</Card.Title>
                {bids.map((bid: any, index: any) => (
                  <Card.Text key={index}>
                    <strong>{bid.contractorName}:</strong> ${bid.bidAmount} {moment(bid.createdAt).format('MM/DD/YY')}
                  </Card.Text>
                ))}
              </Tab>
            </Tabs>
          </Col>
        )}
      </Container>
      {/* Modal for Publish Confirmation */}
    <Modal show={showPublishConfirmation} onHide={handleClosePublishConfirmation}>
      <Modal.Header closeButton>
        <Modal.Title>Project Published</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your project has been successfully published.
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={handleClosePublishConfirmation}
          style={buttonStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}