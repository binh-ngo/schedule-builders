// Chatbox component
import React, { useState } from 'react';
import { ddbChatbotResponse } from '../graphql/chatbot';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles';

interface ChatboxProps {
  onSubmit: (prompt: string, category: string) => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ onSubmit }) => {
  const [minimized, setMinimized] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const chatbotResponse = await ddbChatbotResponse(prompt, category);
    setResponse(chatbotResponse);
  };

  const handleToggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className={`chatbox${minimized ? ' minimized' : ''}`}>
      {!minimized && (
        <Container>
          <Row className="justify-content-center">
            <Col>
              <div className="chatbox-container">
                <h5 onClick={handleToggleMinimize} className='chatbox-title'>Schedule.builders Chatbot</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="categorySelect">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                  <option value="Handyperson">Handyperson</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="House Remodeling">House Remodeling</option>
                  <option value="Deck Building">Deck Building</option>
                  <option value="Roofing">Roofing</option>                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="promptInput">
                    <Form.Label>Prompt:</Form.Label>
                    <Form.Control
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="my-2"
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
                {response && (
                  <div className="chatbox-response">
                    <h2>Generated Response:</h2>
                    <p>{response}</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <div className={`toggle-minimize${minimized ? ' minimized' : ''}`} onClick={handleToggleMinimize}>
        {minimized && <h5 onClick={handleToggleMinimize} className='chatbox-title'>Schedule.builders Chatbot</h5>}
      </div>
    </div>
  );
};

export default Chatbox;
