import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
import { ChangeEvent, useRef, useState } from 'react';
import { buttonStyle, handleMouseOut, handleMouseOver } from '../components/styles';
import { Button } from 'react-bootstrap';

interface FormData {
  user_name: string;
  user_email: string;
  message: string;
}

type ChangeEventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const JoinWaitlist = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_email: '',
    message: '',
  });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_4i4xmp7",
          "template_64831n9",
          form.current,
          "1UA4xHgoYEgO0KucC"
        )
        .then(
          (result: any) => {
            console.log(result.text);
            console.log("message sent");
          },
          (error: any) => {
            console.log(error.text);
          }
        );
    } else {
      console.error("Form reference is null");
    }
  };

  const handleInputChange = (e: ChangeEventType) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const isTextInputsValid =
      formData.user_name !== '' && formData.user_email !== '' && formData.message !== '';

    return isTextInputsValid;
  };

  return (
    <div className="contractor-form">
      <h1 className='contractor-form-header'>Sign up as a Pro!</h1>
      <Form ref={form} onSubmit={sendEmail}>
        <Form.Group className="mb-3 contractor-form-input" controlId="formBasicName">
          <Form.Label className="contractor-form-label">Name</Form.Label>
          <Form.Control type="text" name="user_name" placeholder="Enter name" value={formData.user_name} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group className="mb-3 contractor-form-input" controlId="formBasicEmail">
          <Form.Label className="contractor-form-label">Email</Form.Label>
          <Form.Control type="email" name="user_email" placeholder="Enter email" value={formData.user_email} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group className="mb-3 contractor-form-input" controlId="formBasicMessage">
          <Form.Label className="contractor-form-label">Company</Form.Label>
          <Form.Control type="text" name="message" placeholder="Enter company name and city" value={formData.message} onChange={handleInputChange} required />
        </Form.Group>

        <Button
          className={`contractor-form-input ${!isFormValid() ? "btn btn-secondary" : ""}`}
          disabled={!isFormValid()}
          style={buttonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          type="submit"
          value="Send" > Send Application</Button>
      </Form>
    </div>
  );

}