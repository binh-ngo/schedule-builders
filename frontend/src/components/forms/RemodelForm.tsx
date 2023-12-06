import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import '../components.css';
import { ddbCreateProject } from '../../graphql/projects';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';import moment from 'moment';
import { ddbGetAllClients } from '../../graphql/clients';
import { AccountContext } from '../../Accounts';

const RemodelForm = () => {
    const questions: string[] = [
      'What do you need help with?',
      'Are you considering changing the floorplan of your bathroom?',
      'Which of the following will you need moved or installed in your bathroom remodel? (Check all that apply)',
      'What kind of countertops would you like installed?',
      'Have you already purchased the materials for this project?',
      'Is this request covered by an insurance claim?'
    ];

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [slideRight, setSlideRight] = useState(false);
    const [slideLeft, setSlideLeft] = useState(false);
    const [answers, setAnswers] = useState<string[]>(Array(Math.max(0, questions.length - 1)).fill(''));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const { signIn, clientSignUp } = useContext(AccountContext);

    const contactInfo = {
        name,
        address,
        city,
        phone,
        email
    }

    let navigate = useNavigate();

    function removeEmailDomain(email: string): string {
        const atIndex = email.indexOf('@');

        if (atIndex !== -1) {
            const emailWithoutDomain = email.substring(0, atIndex);
            return emailWithoutDomain;
        }

        // If the email doesn't contain "@", return the original email
        return email;
    }

    const handleAnswerChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        let updatedAnswers = [...answers];
        let selectedStartDate: string | null = null;
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
            case 'startDate':
                selectedStartDate = event.target.value;
                setStartDate(selectedStartDate as string);
                setEndDate('');
                const endDateInput = document.getElementById('endDate') as HTMLInputElement | null;
                if (endDateInput) {
                    endDateInput.min = selectedStartDate || '';
                }
                break;
            case 'endDate':
                setEndDate(event.target.value);
                const timeFrameAnswer = getTimePassed(startDate, event.target.value);
                updatedAnswers[currentQuestionIndex] = timeFrameAnswer;
                break;
            default:
                updatedAnswers[currentQuestionIndex] = event.target.value;
                break;
        }
        setAnswers(updatedAnswers); // Update the state outside the switch

    };

    const getTimePassed = (startDate: string, endDate: string): string => {
        const start = moment(startDate);
        const end = moment(endDate);
        const duration = moment.duration(end.diff(start));
        return duration.humanize();
    };

    const handleNextQuestion = () => {
        setSlideLeft(true);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        setTimeout(() => {
            setSlideLeft(false);
        }, 0);
        console.log(answers);
        console.log(`START DATE ----${startDate}`)
        console.log(`END DATE ----${endDate}`)
    };

    const handlePreviousQuestion = () => {
        setSlideRight(true);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
        setTimeout(() => {
            setSlideRight(false);
        }, 0);
        console.log(answers)
        console.log(`START DATE ----${startDate}`)
        console.log(`END DATE ----${endDate}`)
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !address || !city || !phone || !email || !answers) {
            console.log("Form data is not valid");
            return;
        }
        console.log("Form data is valid. Checking if client exists now.")
        // Check if a contractor with the same name already exists
        const clientExists = await ddbGetAllClients();
        const doesClientExist = clientExists.some(
            (existingClient: any) =>
                existingClient.email === email
        );
        //  Contractor doesn't exist, create account
        if (doesClientExist) {
            console.log("Contractor with the same username already exists.");
            return;
        } else {
            console.log('Username is available!')
            // const tempPassword = ulid();
            try {
                const newUser = await clientSignUp(removeEmailDomain(email), email, 'password');
                console.log("Account created.", newUser);
                // Now, log in the newly created user
                const loggedInNewUser = await signIn(removeEmailDomain(email), 'password');
                console.log("Logged in.", loggedInNewUser);
            } catch (signupError) {
                console.error("Error creating account.", signupError);
            }
            console.log('Form data submitted:', answers);
            console.log('With this contact information:', contactInfo);
        };
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
            startDate,
            endDate
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
            navigate(`/${createdProject.projectId}`);
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

        const isNumber = !isNaN(Number(answers[3]));
        return isTextInputsValid && isQuestionsValid && isNumber;
    };

    const projectTypes = ['Build or Replace Deck', 'Repair Deck', 'Clean and Seal Deck', 'Patio', 'Paint a Deck'];
    const woodTypes = ['Cedar', 'Redwood', 'Ipewood', 'Tigerwood', 'Mahogany', 'Bamboo', 'Pressure-treated Wood', 'Trex (recycled composite)', 'Aluminum', 'Cement', 'Composite (Fiberglass, Vinyl, PVC)'];
    const propertyTypes = ['Residential', 'Business'];

    const renderInput = (question: string, answer: string, index: number) => {
        if (index === 0) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <div className="radio-buttons">
                        {projectTypes.map((type: string) => (
                            <div className='radio-button-container'>
                                <input
                                    className='radio-button'
                                    key={type}
                                    type="radio"
                                    id={type}
                                    name="projectType"
                                    value={type}
                                    checked={answer === type}
                                    onChange={handleAnswerChange}
                                />
                                <label htmlFor={type} className='custom-radio-button-label'>
                                    <div
                                        className={`custom-radio-button ${answer === type ? 'checked' : ''}`}
                                        onClick={() => handleAnswerChange}
                                    ></div>
                                    {type}
                                </label>                                 </div>
                        ))}
                    </div>
                </div>
            );
        } else if (index === 2) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <div className='radio-buttons'>
                        {woodTypes.map((type: string) => (
                            <div key={type} className='radio-button-container'>
                                <input
                                    key={type}
                                    className='radio-button'
                                    type="radio"
                                    id={type}
                                    name="material"
                                    value={type}
                                    checked={answer === type}
                                    onChange={handleAnswerChange}
                                />
                                <label htmlFor={type} className='custom-radio-button-label'>
                                    <div
                                        className={`custom-radio-button ${answer === type ? 'checked' : ''}`}
                                        onClick={() => handleAnswerChange}
                                    ></div>
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (index === 3) {
            const isNumber = !isNaN(Number(answer));
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <input className={`text-input ${!isNumber ? 'error' : ''}`}
                        placeholder="Example: 150" type="text"
                        value={answer}
                        onChange={handleAnswerChange}
                    />
                    {!isNumber && <p className="error-message">Please enter a valid number.</p>}
                </div>
            );
        } else if (index === 4) {
            answer = getTimePassed(startDate, endDate);
            return (
                <>
                    <Row>
                        <Col className='mx-2'>
                            <h2>Start Date</h2>
                            <input
                                className="date"
                                placeholder='mm/dd/yyyy'
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={startDate}
                                onChange={handleAnswerChange}
                            />
                        </Col>

                        <Col className='mx-2'>
                            <h2>End Date</h2>
                            <input
                                className='date'
                                type="date"
                                id="endDate"
                                name="endDate"

                                value={endDate}
                                onChange={handleAnswerChange}
                            />
                        </Col>
                    </Row>
                </>
            );
        } else if (index === 5) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <div className='radio-buttons'>
                        {propertyTypes.map((type: string) => (
                            <div key={type} className='radio-button-container'>
                                <input
                                    key={type}
                                    type="radio"
                                    className='radio-button'
                                    id={type}
                                    name="propertyType"
                                    value={type}
                                    checked={answer === type}
                                    onChange={handleAnswerChange}
                                />
                                <label htmlFor={type} className='custom-radio-button-label'>
                                    <div
                                        className={`custom-radio-button ${answer === type ? 'checked' : ''}`}
                                        onClick={() => handleAnswerChange}
                                    ></div>
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        else if (index === 6) {
            return (
                <div>
                    <h3 className='question-header'>{question}</h3>
                    <div className="user-details-form">
                        <Form>
                            <Form.Group className="mts-5" controlId="name">
                                <Form.Control type="text" placeholder="Name" name="Name" value={name} required onChange={(e: any) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="address">
                                <Form.Control type="text" placeholder="Address" name="Address" value={address} required onChange={(e: any) => setAddress(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="city">
                                <Form.Control type="text" placeholder="City" name="City" value={city} required onChange={(e: any) => setCity(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="phone">
                                <Form.Control type="tel" placeholder="Phone" name="Phone" value={phone} required onChange={(e: any) => setPhone(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="email">
                                <Form.Control type="email" placeholder="Email" name="Email" value={email} required onChange={(e: any) => setEmail(e.target.value)} />
                            </Form.Group>
                        </Form>

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
        <div className={`question-form-container ${slideRight ? 'slideRight' : ''} ${slideLeft ? 'slideLeft' : ''}`}>
            <div className={`question-form mb-5 ${slideRight ? 'slideRight' : ''} ${slideLeft ? 'slideLeft' : ''}`}>
                <div className={`progress-bar ${currentQuestionIndex === questions.length ? 'full-width' : ''}`} style={{ width: calculateProgress() }}></div>
                {currentQuestionIndex !== questions.length && (
                    <div className="question-answer">
                        {renderInput(questions[currentQuestionIndex], answers[currentQuestionIndex], currentQuestionIndex)}
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
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button className="next-button" onClick={handleNextQuestion}>
                            Next
                        </button>
                    ) : (
                        <button className={`submit-button ${!isFormValid() ? 'btn btn-secondary' : ''}`} disabled={!isFormValid()} onClick={handleSubmit}>
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RemodelForm;
