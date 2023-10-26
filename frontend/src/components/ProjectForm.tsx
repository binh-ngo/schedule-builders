import React, { useState, ChangeEvent, FormEvent } from 'react';
import './components.css';
import { ddbCreateProject } from '../graphql/projects';
import { useNavigate } from 'react-router-dom';

interface ProjectFormProps { }

const ProjectForm: React.FC<ProjectFormProps> = () => {
    const questions: string[] = [
        'What type of decking or patio project is this?',
        'Please provide a detailed description of what you want us to do.',
        'What material do you want to build the deck with?',
        'What is the approximate size of this project?',
        'What is your timeframe?',
        'What type of property is it?',
        'Please provide your contact information and I will reach out to you shortly.',
    ];

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const contactInfo = {
        name,
        address,
        city,
        phone,
        email
    }

    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let navigate = useNavigate();

    const handleAnswerChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
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
        if (currentQuestionIndex < questions.length - 1) {
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
            navigate('/home');
        } else {
            console.log("onSave called but title or children are empty");
        }
    }

    const calculateProgress = () => {
        return ((currentQuestionIndex + 1) / questions.length) * 100 + '%';
    };
    const projectTypes = ['Build or Replace Deck', 'Repair Deck', 'Clean and Seal Deck', 'Patio', 'Paint a Deck'];
    const woodTypes = ['Cedar', 'Pressure-treated Pine', 'Redwood', 'Synthetic or Composite', 'Vinyl', 'Need Recommendation'];
    const projectSizes = ['Small: Less than 150 sq ft', 'Medium: 150 - 300 sq ft', 'Large: More than 300 sq ft'];
    const timeframes = ['Less than 1 week or less', 'Two weeks', '1 month'];
    const renderInput = (question: string, answer: string, index: number) => {
        if (index === 0) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    {projectTypes.map((type: string) => (
                        <div className='radio-buttons'>
                            <input
                                type="radio"
                                id={type}
                                name="projectType"
                                value={type}
                                checked={answer === type}
                                onChange={handleAnswerChange}
                            />
                            <label htmlFor={type}>{type}</label>
                        </div>
                    ))}
                </div>
            );
        } else if (index === 2) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    {woodTypes.map((type: string) => (
                        <div className='radio-buttons'>
                            <input
                                type="radio"
                                id={type}
                                name="projectType"
                                value={type}
                                checked={answer === type}
                                onChange={handleAnswerChange}
                            />
                            <label htmlFor={type}>{type}</label>
                        </div>))}
                </div>
            );
        } else if (index === 3) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    {projectSizes.map((size: string) => (
                        <div className='radio-buttons'>
                            <input
                                type="radio"
                                id={size}
                                name="projectType"
                                value={size}
                                checked={answer === size}
                                onChange={handleAnswerChange}
                            />
                            <label htmlFor={size}>{size}</label>
                        </div>
                    ))}
                </div>
            );
        } else if (index === 4) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    {timeframes.map((timeframe: string) => (
                        <div className='radio-buttons'>
                            <input
                                type="radio"
                                id={timeframe}
                                name="projectType"
                                value={timeframe}
                                checked={answer === timeframe}
                                onChange={handleAnswerChange}
                            />
                            <label htmlFor={timeframe}>{timeframe}</label>
                        </div>
                    ))}
                </div>
            );
        } else if (index === 5) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <div className='radio-buttons'>
                        <input
                            type="radio"
                            id="Residential"
                            name="projectType"
                            value="Residential"
                            checked={answer === "Residential"}
                            onChange={handleAnswerChange}
                        />
                        <label htmlFor="Residential">Residential</label>
                    </div>
                    <div className='radio-buttons'>
                        <input
                            type="radio"
                            id="Business"
                            name="projectType"
                            value="Business"
                            checked={answer === 'Business'}
                            onChange={handleAnswerChange}
                        />
                        <label htmlFor="Business">Business</label>
                    </div>
                </div>
            );
        }
        else if (index === 6) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <div className="user-details-form">
                        <input className='contact-info' type="text" placeholder="Name" name="Name" value={name} onChange={handleAnswerChange} />
                        <input className='contact-info' type="text" placeholder="Address" name="Address" value={address} onChange={handleAnswerChange} />
                        <input className='contact-info' type="text" placeholder="City" name="City" value={city} onChange={handleAnswerChange} />
                        <input className='contact-info' type="text" placeholder="Phone" name="Phone" value={phone} onChange={handleAnswerChange} />
                        <input className='contact-info' type="email" placeholder="Email" name="Email" value={email} onChange={handleAnswerChange} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <input className='text-input' type="text" value={answer} onChange={handleAnswerChange} />
                </div>
            );
        }
    };

    return (
        <div className="question-form-container">
            <div className="question-form">
                <div className="progress-bar" style={{ width: calculateProgress() }}></div>
                <div className="question-answer">
                    {renderInput(questions[currentQuestionIndex], answers[currentQuestionIndex], currentQuestionIndex)}
                </div>
                <div className="button-container">
                    <button
                        className="prev-button"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button className="next-button" onClick={handleNextQuestion}>
                            Next
                        </button>
                    ) : (
                        <button className="submit-button" onClick={handleSubmit}>
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;
