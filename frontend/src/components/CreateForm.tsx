import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ddbCreateForm, ddbGetAllForms } from '../graphql/forms';

export const CreateForm = () => {
    const [formStep, setFormStep] = useState(0);
    const [formData, setFormData] = useState({
        formName: '',
        questions: [] as string[],
        attributes: [] as string[],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [slideRight, setSlideRight] = useState(false);
    const [slideLeft, setSlideLeft] = useState(false)

    useEffect(() => {
        // Add an initial question and attribute when the component mounts
        setFormData((prevData) => ({
            ...prevData,
            questions: [''],
            attributes: [''],
        }));
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFieldChange = (field: 'questions' | 'attributes', value: string, index: number) => {
        const updatedData = [...formData[field]];
        updatedData[index] = value;
        setFormData((prevData) => ({
            ...prevData,
            [field]: updatedData,
        }));
    };

    const handleNextStep = () => {
        setSlideLeft(true);
        if (formStep === 0 && formData.formName.trim() === '') {
            setError('Please enter a form name.');
            return;
        } setTimeout(() => {
            setSlideLeft(false);
          }, 0);

        setFormStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setSlideRight(true);
        setFormStep((prevStep) => prevStep - 1);
        setError(null);
        setTimeout(() => {
            setSlideRight(false);
          }, 0);
    };

    const handleAddQuestion = () => {
        setFormData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, ''],
            attributes: [...prevData.attributes, ''],
        }));
    };

    const handleRemoveQuestion = (indexToRemove: number) => {
        setFormData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            const updatedAttributes = [...prevData.attributes];

            // Remove the question and attribute at the specified index
            updatedQuestions.splice(indexToRemove, 1);
            updatedAttributes.splice(indexToRemove, 1);

            return {
                ...prevData,
                questions: updatedQuestions,
                attributes: updatedAttributes,
            };
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Check if a form with the same name already exists
            const formExists = await ddbGetAllForms();
            const isFormExists = formExists.some(
                (existingForm: any) => existingForm.formName === formData.formName
            );

            if (isFormExists) {
                setError('A form with the same name already exists.');
            } else {
                // Perform form submission
                const formObject = {
                    formName: formData.formName,
                    questions: formData.questions.map((question, index) => ({
                        question: formData.questions[index],
                        attributes: {
                            name: formData.attributes[index],
                        },
                    })),
                };

                const response = await ddbCreateForm(formObject);

                if ('data' in response) {
                    console.log(`Response from DynamoDB: ${JSON.stringify(response.data)}`);
                } else {
                    console.error('Response is not a GraphQL result:', response);
                }
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            setError('An error occurred during form submission. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`question-form-container ${slideRight ? 'slideRight' : ''} ${slideLeft ? 'slideLeft' : ''}`}>
            <div className={`question-form ${slideRight ? 'slideRight' : ''} ${slideLeft ? 'slideLeft' : ''}`}>
                <div>
                    <Form className="createForm" onSubmit={handleSubmit}>
                        {formStep === 0 && (
                            <div className="formName">
                                <h1>Form Name</h1>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        name="formName"
                                        value={formData.formName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <Button className='mt-2' 
                                        type="button" 
                                        style={{ backgroundColor: formData.formName !== '' ? '#164863' : '#9BBEC8' }}
                                        disabled={formData.formName === '' ? true : false} 
                                        onClick={handleNextStep}>
                                    Next
                                </Button>
                            </div>
                        )}
                        {formStep > 0 && (
                            <div>
                                {formData.questions.map((question, index) => (
                                    <div className="quesAttRow" key={index}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId={`question${index + 1}`}>
                                                    <Form.Control
                                                        className="my-1 formInput"
                                                        placeholder="Question"
                                                        type="text"
                                                        name="question"
                                                        value={question || ''}
                                                        onChange={(e) => handleFieldChange('questions', e.target.value, index)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId={`attribute${index + 1}`}>
                                                    <Form.Control
                                                        placeholder='Attribute (Length, Width, Weight, Etc)'
                                                        className="my-1 formInput"
                                                        type="text"
                                                        name="attribute"
                                                        value={formData.attributes[index] || ''}
                                                        onChange={(e) => handleFieldChange('attributes', e.target.value, index)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Button className="removeBtn formInput" variant="transparent" type="button" onClick={() => handleRemoveQuestion(index)}>
                                                    ❌
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <div className='formButtons'>
                                    <Button 
                                        type="button" 
                                        style={{ backgroundColor: '#427D9D'}}
                                        onClick={handleAddQuestion}>
                                        Add Question
                                    </Button>
                                    <Button 
                                        type="button" 
                                        style={{ backgroundColor: '#9BBEC8'}}
                                        onClick={handlePreviousStep}>
                                        Previous
                                    </Button>
                                    {formStep !== 1 &&
                                        <Button 
                                        type="button" 
                                        style={{ backgroundColor: '#164863'}}
                                        onClick={handleNextStep}>
                                            Next
                                        </Button>
                                    }
                                    <Button 
                                    type="submit"
                                    style={{ backgroundColor: '#164863'}}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        )
                        }
                    </Form >
                </div>
            </div>
        </div>
    );
};