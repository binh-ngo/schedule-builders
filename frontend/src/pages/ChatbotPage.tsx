import React, { useState } from 'react';
import { ddbChatbotResponse } from '../graphql/chatbot';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles';

const ChatbotPage: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse(null);
    const chatbotResponse = await ddbChatbotResponse(prompt, category);
    setResponse(chatbotResponse);
  };

  return (
    <Container className='chatbotPage'>
      <Row className="justify-content-md-center mt-5">
        <Col md={6} className="chatbot-container">
          <div className="chat-header">
            <h1>Schedule.builders Chatbot</h1>
          </div>
          
          <div className="chat-footer">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="categorySelect" className='my-2'>
                <Form.Label className='font-weight-bold'>Select a category:</Form.Label>
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
                  <option value="Roofing">Roofing</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="promptInput" className='my-2'>
                <Form.Label className='font-weight-bold'>Ask me a question:</Form.Label>
                <Form.Control
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </Form.Group>
              <Button
                style={buttonStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="chat-body">
            {response && (
              <div className="my-10">
                <p className='chatbot-text'>{response}</p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatbotPage;
