import { useState, ChangeEvent, FormEvent } from 'react';
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
        if (formStep === 0 && formData.formName.trim() === '') {
            setError('Please enter a form name.');
            return;
        }

        setFormStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setFormStep((prevStep) => prevStep - 1);
        setError(null);
    };

    const handleAddQuestion = () => {
        setFormData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, ''],
            attributes: [...prevData.attributes, ''],
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log(`FORM TYPE ----- ${JSON.stringify(formData)}`)
        console.log(`FORM NAME ----- ${formData.formName}`)
        console.log(`QUESTIONS ----- ${formData.questions}`)
        console.log(`ANSWERS ----- ${formData.attributes}`)
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

                const response = await ddbCreateForm( formObject );

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
        <form onSubmit={handleSubmit}>
            {formStep === 0 && (
                <div>
                    <label>
                        Form Name:
                        <input
                            type="text"
                            name="formName"
                            value={formData.formName}
                            onChange={handleInputChange}
                        />
                    </label>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="button" onClick={handleNextStep}>
                        Next
                    </button>
                </div>
            )}
            {formStep > 0 && (
                <div>
                    {formData.questions.map((question, index) => (
                        <div key={index}>
                            <label>
                                Question {index + 1}:
                                <input
                                    type="text"
                                    name="question"
                                    value={question || ''}
                                    onChange={(e) => handleFieldChange('questions', e.target.value, index)}
                                />
                            </label>
                            <label>
                                Attribute Type {index + 1}:
                                <input
                                    type="text"
                                    name="attribute"
                                    value={formData.attributes[index] || ''}
                                    onChange={(e) => handleFieldChange('attributes', e.target.value, index)}
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion}>
                        Add Question
                    </button>
                    <button type="button" onClick={handlePreviousStep}>
                        Previous
                    </button>
                    <button type="button" onClick={handleNextStep}>
                        Next
                    </button>
                    <button type="submit">
                        Submit
                    </button>
                </div>
            )}
        </form>
    );
};