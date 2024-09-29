// src/components/SubmissionForm.jsx
import React, { useState } from 'react';
import './SubmissionForm.css'; // Import CSS for styling

const SubmissionForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to hold the form data
    const formDataToSend = new FormData();
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

    // Append file only if one is selected
    if (formData.file) {
      formDataToSend.append('file', formData.file); // Append the file to the FormData object
    }

    try {
      const response = await fetch('https://getform.io/f/awngpkxb', {
        method: 'POST',
        body: formDataToSend, // Use FormData directly
      });

      if (response.ok) {
        setSubmitted(true);
        setError(false);
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
    <form onSubmit={handleSubmit}>
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
      <input type="text" name="country" value={formData.country} onChange={handleChange} required />

      <label>State:</label>
      <input type="text" name="state" value={formData.state} onChange={handleChange} required />

      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />

      <label>Address:</label>
      <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

      <label>Pincode:</label>
      <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} required />

      <label>Upload File:</label>
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
  );
};

export default SubmissionForm;
