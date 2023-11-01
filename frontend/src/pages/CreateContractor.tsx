import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Form } from 'react-bootstrap'
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

export const CreateContractor = (props:any) => {
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

  const { signIn, signUp } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const isFormValid = () => {
    const isTextInputsValid =
      formData.contractorName !== '' &&formData.password !== ''  && formData.confirmPassword !== '' && formData.address !== '' && formData.city !== '' && formData.phone !== '' && formData.email !== '' && formData.specialty !== '' && formData.company !== '';
    
      const isPasswordValid =
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword;
      
      return isTextInputsValid && isPasswordValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
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
        const newUser = await signUp(formData.contractorName, formData.email, formData.password);
        console.log("Account created.", newUser);
        // Now, log in the newly created user
        const loggedInNewUser = await signIn(formData.email, formData.password);
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
    <div className="contractor-form">
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
    />
  </Form.Group>

  <Form.Group className="contractor-form-input" controlId="password">
    <Form.Label className="contractor-form-label">Password</Form.Label>
    <Form.Control
      type="password"
      placeholder="Password"
      name="password"
      value={formData.password}
      required
      onChange={handleInputChange}
    />
      <Form.Text className="text-muted">Passwords must be at least 8 characters</Form.Text>
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
    <Form.Control
      type="text"
      placeholder="Specialty"
      name="specialty"
      value={formData.specialty}
      required
      onChange={handleInputChange}
    />
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
    />
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
    className={`contractor-form-input submit-button ${
      !isFormValid() ? "btn btn-secondary" : ""
    }`}
    disabled={!isFormValid()}
    onClick={handleSubmit}
  >
    Submit
  </button>
</Form>


    </div>
  )
}
