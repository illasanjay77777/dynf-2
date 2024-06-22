import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import FormSummary from './FormSummary';
import './App.css'; // Import your CSS file

const JobApplicationForm = () => {
  const INITIAL_STATE = {
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false
    },
    preferredInterviewTime: ''
  };

  const validate = (values) => {
    let errors = {};

    if (!values.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    if (!values.applyingForPosition) {
      errors.applyingForPosition = 'Applying for Position is required';
    }

    if ((values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer') && !values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required for Developer or Designer';
    } else if ((values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer') && (isNaN(values.relevantExperience) || +values.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }

    if (values.applyingForPosition === 'Designer' && !values.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required for Designer';
    } else if (values.applyingForPosition === 'Designer' && !isURL(values.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }

    if (values.applyingForPosition === 'Manager' && !values.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required for Manager';
    }

    if (!values.additionalSkills.JavaScript && !values.additionalSkills.CSS && !values.additionalSkills.Python) {
      errors.additionalSkills = 'At least one Additional Skill must be selected';
    }

    if (!values.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (isNaN(Date.parse(values.preferredInterviewTime))) {
      errors.preferredInterviewTime = 'Preferred Interview Time must be a valid date and time';
    }

    return errors;
  };

  const isURL = (url) => {
    // Basic URL validation
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const { values, handleChange, handleCheckboxChange, errors, isSubmitting, setErrors, setIsSubmitting } = useFormValidation(INITIAL_STATE, validate);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(values);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
  };

  return (
    <div className="App">
      <h2>Job Application Form</h2>
      {!submittedData ? (
        <form onSubmit={handleFormSubmit} noValidate>
          {/* Full Name */}
          <div>
            <label>Full Name</label>
            <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input type="email" name="email" value={values.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Phone Number */}
          <div>
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          {/* Applying for Position */}
          <div>
            <label>Applying for Position</label>
            <select name="applyingForPosition" value={values.applyingForPosition} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.applyingForPosition && <span className="error">{errors.applyingForPosition}</span>}
          </div>

          {/* Additional Skills */}
          <div>
            <label>Additional Skills</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={values.additionalSkills.JavaScript}
                  onChange={(e) => handleCheckboxChange('JavaScript', e.target.checked)}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="CSS"
                  checked={values.additionalSkills.CSS}
                  onChange={(e) => handleCheckboxChange('CSS', e.target.checked)}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Python"
                  checked={values.additionalSkills.Python}
                  onChange={(e) => handleCheckboxChange('Python', e.target.checked)}
                />
                Python
              </label>
              {/* Add more skills as needed */}
            </div>
            {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
          </div>

          {/* Relevant Experience (visible if Developer or Designer is selected) */}
          {(values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer') && (
            <div>
              <label>Relevant Experience (years)</label>
              <input type="number" name="relevantExperience" value={values.relevantExperience} onChange={handleChange} />
              {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
            </div>
          )}

          {/* Portfolio URL (visible if Designer is selected) */}
          {values.applyingForPosition === 'Designer' && (
            <div>
              <label>Portfolio URL</label>
              <input type="text" name="portfolioURL" value={values.portfolioURL} onChange={handleChange} />
              {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
            </div>
          )}

          {/* Management Experience (visible if Manager is selected) */}
          {values.applyingForPosition === 'Manager' && (
            <div>
              <label>Management Experience</label>
              <input type="text" name="managementExperience" value={values.managementExperience} onChange={handleChange} />
              {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
            </div>
          )}

          {/* Preferred Interview Time */}
                       {/* Preferred Interview Time */}
                       <div>
               <label>Preferred Interview Time</label>
               <input type="datetime-local" name="preferredInterviewTime" value={values.preferredInterviewTime} onChange={handleChange} />
               {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
             </div>

             {/* Submit Button */}
             <button type="submit" disabled={isSubmitting}>Submit</button>
           </form>
         ) : (
           <FormSummary submittedData={submittedData} resetForm={resetForm} />
         )}
       </div>
     );
   };

   export default JobApplicationForm;
