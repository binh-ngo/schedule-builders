import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// @ts-ignore
import { useEffect, useState } from 'react';
import { ddbAddSelection, ddbDeleteForm, ddbGetAllForms, ddbGetSelectedForm, ddbRemoveSelection } from '../graphql/forms';
import Button from 'react-bootstrap/Button';
import CardText from 'react-bootstrap/CardText';
import Modal from 'react-bootstrap/Modal';

type FormProps = {
  formName: string;
  formId?: string;
  isSelected: string;
  questions: {
    question: string;
    attributes: {
      name: string;
    };
  }[];
};

export const FormCard = (form: FormProps) => {
  const [forms, setForms] = useState<FormProps[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const fetchForms = async () => {
      const getForms = await ddbGetAllForms();
      setForms(getForms);
    };
    fetchForms();
  }, []);

  const handleDeleteForm = () => {
    ddbDeleteForm(form.formName, form.formId ? form.formId : '');
    handleClose();
  }

  const handleSelectForm = async () => {
    try {
      // Get the currently selected form
      const formSelected = await ddbGetSelectedForm();
      // If a form is already selected, remove the selection
      if (formSelected[0]) {
        console.log(`Calling ddbRemoveSelection with formId...${formSelected[0].formId}`);
        await ddbRemoveSelection(formSelected[0].formId);
      } else {
        console.log('No need to remove selection.');
      }

      // Add the selection for the new form
      await ddbAddSelection(form.formId ?? '');

      // Close the modal
      handleClose();
    } catch (error) {
      // Handle errors, log them, or show a user-friendly message
      console.error('Error in handleSelectForm:', error);
    }
  };


  return (
    <div className="form-container">
      <Card className={form.isSelected ? `selectedCard` : `formCard`} onClick={handleShow}>
        <Card.Body>
          <Card.Title>{form.formName}</Card.Title>
          <CardText className='selectedText'>{form.isSelected ? 'Selected' : ''}</CardText>
        </Card.Body>
        <ListGroup variant="flush">
          {form.questions && form.questions.slice(0, 3).map((question, index) => (
            <ListGroup.Item key={index}>
              <div>Question: {question.question}</div>
              <div>Attribute: {question.attributes.name}</div>
            </ListGroup.Item>
          ))}
          {form.questions && form.questions.length > 3 && (
            <ListGroup.Item>
              <div>...</div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <Modal show={showModal} onHide={handleClose} className="form-modal">
        <Modal.Header closeButton>Modal
          <Modal.Title>{form.formName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {form.questions && form.questions.map((question, index) => (
              <ListGroup.Item key={index}>
                <div>Question: {question.question}</div>
                <div>Attribute: {question.attributes.name}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          { !form.isSelected && 
            <Button style={{"backgroundColor": "black"}} onClick={handleSelectForm}>
            Select
          </Button>
          }
          <Button style={{"backgroundColor": "black"}} onClick={handleDeleteForm}>
            Delete
          </Button>
          <Button style={{"backgroundColor": "black"}} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}
