// src/components/SubmissionForm.jsx
import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import './SubmissionForm.css'; // Import CSS for styling
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useNavigate } from 'react-router-dom';

const SubmissionForm = () => {

  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    mailId: '',
    fatherName: '',
    dob: '',
    gender: '',
    country: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
    file: null,
    password: '',
    confirmPassword: '',
    remarks: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0] // Store the file object
    });
  };

    // Update the formData when country is selected
    const handleCountryChange = (val) => {
      setCountry(val);
      setFormData({
        ...formData,
        country: val,
      });
    };
  
    // Update the formData when state is selected
    const handleStateChange = (val) => {
      setState(val);
      setFormData({
        ...formData,
        state: val,
      });
    };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    // Append all form data
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mobile', formData.mobile);
    formDataToSend.append('email', formData.mailId);
    formDataToSend.append('father_name', formData.fatherName);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('pincode', formData.pincode);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirm_password', formData.confirmPassword);
    formDataToSend.append('remarks', formData.remarks);
  
    // Append the file if one is selected
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }
  
    try {
      const response = await fetch('https://getform.io/f/awngpkxb', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        setSubmitted(true);
        setError(false);
        setShowPopup(true);
  
        // Show the popup for 2 seconds, then redirect to login form
        setTimeout(() => {
          setShowPopup(false);  // Hide the popup after 2 seconds
          navigate('/login');   // Redirect to the login page
        }, 2000); // 2 seconds (2000 milliseconds)
        
      } else {
        setError(true);
        console.error('Form submission failed. Status:', response.statusText);
      }
    } catch (err) {
      setError(true);
      console.error('Form submission failed:', err);
    }
  };
  return (
    <>
    <div className='Registration-Form'>
          <h1 style={{textAlign: "center", paddingTop: "3rem"}}>Register</h1>
    <form onSubmit={handleSubmit} style={{padding: "1rem"}}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Mobile:</label>
      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="mailId" value={formData.mailId} onChange={handleChange} required />

      <label>Father's Name:</label>
      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />

      <label>Date of Birth:</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

    <label>Country:</label>
      <CountryDropdown
        value={country}
       onChange={handleCountryChange} 
        className="form-control"
        required
      />
    <label>State:</label>
      <RegionDropdown
        country={country}
        value={state}
        onChange={handleStateChange} 
        className="form-control"
      />
      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />

      <label>Address:</label>
      <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

      <label>Pincode:</label>
      <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} required />

      <label>Photo Identify proof (with address)</label>
      <input type="file" name="file" accept="image/png" onChange={handleFileChange} required/>

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />

      <label>Confirm Password:</label>
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

      <label>Remarks:</label>
      <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>

      <button type="submit">Submit</button>

      {submitted && <p>Form submitted successfully!</p>}
      {error && <p>Submission failed. Please try again.</p>}
    </form>
    {/* Popup modal */}
  {showPopup && (
    <div className="popup-overlay">
      <div className="popup-content">
        <FaCheckCircle className="tick-icon" />
        <h2>Success!</h2>
        <p>Product Added Successfully</p>
      </div>
    </div>
  )}
  </div>
  </>
  );
};

export default SubmissionForm;
