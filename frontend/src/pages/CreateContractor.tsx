import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Form } from 'react-bootstrap'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../Accounts';
import { ddbCreateContractor, ddbGetAllContractors } from '../graphql/contractors';

interface FormData {
  contractorName: string;
  company: string;
  specialty: string;
  imageUrl: File | null;
  address: string;
  city: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ChangeEventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

const specialtyOptions: string[] = ['Handyperson', 'Landcaping', 'Plumbing', 'Electrical', 'Deck Building', 'Remodeling', 'Roofing'];

export const CreateContractor = (props: any) => {
  const [formData, setFormData] = useState<FormData>({
    contractorName: '',
    company: '',
    specialty: '',
    imageUrl: null,
    address: '',
    city: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const { signIn, proSignUp } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";


  function removeEmailDomain(email: string): string {
    const atIndex = email.indexOf('@');

    if (atIndex !== -1) {
      const emailWithoutDomain = email.substring(0, atIndex);
      return emailWithoutDomain;
    }

    // If the email doesn't contain "@", return the original email
    return email;
  }

  const handleInputChange = (e: ChangeEventType) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEventType) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const file = e.target.files ? e.target.files[0] : null;
    console.log(fieldName)
    console.log(file!.name)
    if (file) {
      setFormData({ ...formData, [fieldName]: file });
      console.log(`IMAGE ${formData.imageUrl}`)
    } else {
      setFormData({ ...formData, [fieldName]: null });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const isFieldValid = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return touchedFields.email ? validateEmail(formData.email) : true;
      case 'phone':
        return touchedFields.phone ? validatePhoneNumber(formData.phone) : true;
      default:
        return true;
    }
  };

  const isFormValid = () => {
    const isTextInputsValid =
      formData.contractorName !== '' && formData.password !== '' && formData.confirmPassword !== '' && formData.address !== '' && formData.city !== '' && formData.phone !== '' && formData.email !== '' && formData.specialty !== '' && formData.company !== '';

    const isPasswordValid =
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword;

    return isTextInputsValid && isPasswordValid;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    // Modify the regex as needed for your phone number format
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !validateEmail(formData.email) || !validatePhoneNumber(formData.phone)) {
      console.log("Form data is not valid.");
      return;
    }
    // Check if a contractor with the same name already exists
    const contractorExists = await ddbGetAllContractors();
    const isContractorExists = contractorExists.some(
      (existingContractor: any) =>
        existingContractor.contractorName === formData.contractorName
    );
    //  Contractor doesn't exist, create account
    if (isContractorExists) {
      console.log("Contractor with the same name already exists.");
    } else {
      try {
        const newUser = await proSignUp(removeEmailDomain(formData.email), formData.email, formData.password);
        console.log("Account created.", newUser);
        // Now, log in the newly created user
        const loggedInNewUser = await signIn(removeEmailDomain(formData.email), formData.password);
        console.log("Logged in.", loggedInNewUser);
        navigate(from, { replace: true });
      } catch (signupError) {
        console.error("Error creating account.", signupError);
      }

      // Contractor doesn't exist, proceed with creating it
      const contractor = {
        contractorName: formData.contractorName,
        company: formData.company,
        specialty: formData.specialty,
        imageUrl: formData.imageUrl,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
      };

      let createdContractor = null;
      const response = await ddbCreateContractor(contractor);

      if ('data' in response) {
        createdContractor = response.data.createContractor;
        console.log(`Response from DynamoDB: ${JSON.stringify(createdContractor)}`);
      } else {
        console.error('Response is not a GraphQL result:', response);
      }

      if (createdContractor) {
        console.log("Contractor successfully created");
        const uploadUrl = createdContractor.imageUrl;
        console.log(`S3 URL ~~~~~~~~${uploadUrl}`);
        await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: formData.imageUrl
        })
      } else {
        console.error("Failed to create contractor.");
      }
    }
  };
  return (
    <HelmetProvider>
      <div className="contractor-form">
        <Helmet>
          <title>Contractor Signup</title>
          <meta
            name="description"
            content="Join our community of contractors by signing up. Gain exclusive access to our website's features by creating an account."
          />
        </Helmet>
        <h1 className='contractor-form-header'>Contractor Form</h1>
        <Form>
          <Form.Group className="contractor-form-input" controlId="name">
            <Form.Label className="contractor-form-label">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="contractorName"
              value={formData.contractorName}
              required
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="email">
            <Form.Label className="contractor-form-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touchedFields.email && !isFieldValid('email') && (
              <Form.Text className="text-danger">Invalid email address</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="password">
            <Form.Label className="contractor-form-label">Password</Form.Label>
            <Form.Text className="text-muted">Passwords must be at least 8 characters</Form.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              required
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="confirmPassword">
            <Form.Label className="contractor-form-label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              required
              onChange={handleInputChange}
            />
            {formData.password !== formData.confirmPassword && (
              <Form.Text className="text-danger">Passwords do not match</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="company">
            <Form.Label className="contractor-form-label">Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company"
              name="company"
              value={formData.company}
              required
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="specialty">
            <Form.Label className="contractor-form-label">Specialty</Form.Label>
            <Form.Select
              aria-label="Select Specialty"
              name="specialty"
              value={formData.specialty}
              required
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Specialty</option>
              {specialtyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="address">
            <Form.Label className="contractor-form-label">Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              required
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="phone">
            <Form.Label className="contractor-form-label">Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              required
              onChange={handleInputChange}
              onBlur={handleBlur} // Add onBlur event handler
            />
            {touchedFields.phone && !isFieldValid('phone') && (
              <Form.Text className="text-danger">Invalid phone number</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="city">
            <Form.Label className="contractor-form-label">City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              required
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="contractor-form-input" controlId="imageUrl">
            <Form.Label className="contractor-form-label">Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="imageUrl"
              onChange={handleImageChange}
            />
          </Form.Group>

          <button
            className={`contractor-form-input submit-button ${!isFormValid() ? "btn btn-secondary" : ""
              }`}
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Form>
      </div>
    </HelmetProvider>
  )
}
