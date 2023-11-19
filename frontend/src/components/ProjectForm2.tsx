import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './components.css';
import { ddbCreateProject } from '../graphql/projects';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ddbGetSelectedForm } from '../graphql/forms';

type Question = {
    question: string;
    attributes: {
        name: string;
        value: string;
    }
}

const ProjectForm2 = () => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchSelectedForm = async () => {
            try {
                const selectedForm = await ddbGetSelectedForm();
                console.log(JSON.stringify(selectedForm))
                if (selectedForm && selectedForm.length > 0 && selectedForm[0].questions && selectedForm[0].questions.length > 0) {
                    let questionArray: Question[] = [];
                    for (let i = 0; i < selectedForm[0].questions.length; i++) {
                        const question = selectedForm[0].questions[i];
                        questionArray.push(question);
                    }
                    setQuestions(questionArray);
                    console.log(questionArray);
                } else {
                    console.error("Selected form or its questions array is undefined or empty.");
                }
            } catch (error) {
                console.error("Error fetching selected form:", error);
            }
        };
        fetchSelectedForm();
    }, []);

    const contactInfo = {
        name,
        address,
        city,
        phone,
        email
    }

    const [answers, setAnswers] = useState<string[]>(Array(Math.max(0, questions.length)).fill(''));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let navigate = useNavigate();

    const handleAnswerChange = (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
    ) => {
        switch (event.target.name) {
            case 'Name':
                setName(event.target.value);
                break;
            case 'Address':
                setAddress(event.target.value);
                break;
            case 'City':
                setCity(event.target.value);
                break;
            case 'Phone':
                setPhone(event.target.value);
                break;
            case 'Email':
                setEmail(event.target.value);
                break;
            default:
                const updatedAnswers = [...answers];
                updatedAnswers[currentQuestionIndex] = event.target.value;
                setAnswers(updatedAnswers);
                break;
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        console.log(answers)
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
        console.log(answers)

    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (name && address && city && phone && email !== '' && answers !== null)
            console.log('Form data submitted:', answers);
        console.log('With this contact information:', contactInfo);

        const project = {
            projectType: answers[0],
            description: answers[1],
            material: answers[2],
            projectSize: answers[3],
            desiredCompletionTime: answers[4],
            propertyType: answers[5],
            clientName: contactInfo.name,
            address: contactInfo.address,
            city: contactInfo.city,
            clientPhone: contactInfo.phone,
            email: contactInfo.email,

        }

        let createdProject = null;
        const response = await ddbCreateProject(project)
        if ('data' in response) {
            createdProject = response.data.createProject;
            console.log(`Response from DynamoDB: ${JSON.stringify(createdProject)}`);
        } else {
            console.error('Response is not a GraphQL result:', response);
        } if (createdProject) {
            console.log("Project successfully created")
            navigate('/schedule-appointment');
        } else {
            console.log("onSave called but title or children are empty");
        }
    }

    const calculateProgress = () => {
        return ((currentQuestionIndex + 1) / questions.length) * 100 + '%';
    };

    const isFormValid = () => {
        const isTextInputsValid =
            name !== '' && address !== '' && city !== '' && phone !== '' && email !== '';

        const isQuestionsValid = answers.every(answer => answer !== '');

        return isTextInputsValid && isQuestionsValid;
    };
    
    const renderInput = (questionData: Question, answer: string, index: number) => {           
            return (
                <div>
                    <h3 className='question-header'>{questionData.question}</h3>
                    <textarea
                        className='text-input'
                        placeholder={questionData.attributes.name || ''}
                        value={answer}
                        onChange={(e) => handleAnswerChange(e)}
                    />
                </div>
            );
    };

    return (
        <div className="question-form-container">
            <div className="question-form">
                <div className="progress-bar" style={{ width: calculateProgress() }}></div>
                {currentQuestionIndex < questions.length ? (
                    <div key={currentQuestionIndex} className="question-answer">
                        {renderInput(questions[currentQuestionIndex], answers[currentQuestionIndex], currentQuestionIndex)}
                    </div>
                ) : (
                    <div key="contact-form" className="question-answer">
                        <h3 className="question-header">Contact Information</h3>
                        <div className="user-details-form">
                            <Form>
                            <Form.Group className="mts-5" controlId="name">
                                <Form.Control type="text" placeholder="name" name="Name" value={name} required onChange={(e: any) => setName(e.target.value)} />
                            </Form.Group>
    
                            <Form.Group className="my-2" controlId="address">
                                <Form.Control type="text" placeholder="address" name="Address" value={address} required onChange={(e: any) => setAddress(e.target.value)} />
                            </Form.Group>
    
                            <Form.Group className="my-2" controlId="city">
                                <Form.Control type="text" placeholder="city" name="City" value={city} required onChange={(e: any) => setCity(e.target.value)} />
                            </Form.Group>
    
                            <Form.Group className="my-2" controlId="phone">
                                <Form.Control type="tel" placeholder="phone" name="Phone" value={phone} required onChange={(e: any) => setPhone(e.target.value)} />
                            </Form.Group>
    
                            <Form.Group className="my-2" controlId="email">
                                <Form.Control type="email" placeholder="email" name="Email" value={email} required onChange={(e: any) => setEmail(e.target.value)} />
                            </Form.Group>
                            </Form>
                        </div>
                    </div>
                )}
                <div className="button-container">
                    <button
                        className="prev-button"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < questions.length ? (
                        <button className="next-button" onClick={handleNextQuestion}>
                            Next
                        </button>
                    ) : (
                        <button
                            className={`submit-button ${!isFormValid() ? 'btn btn-secondary' : ''}`}
                            disabled={!isFormValid()}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectForm2;
