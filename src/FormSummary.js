import React from 'react';

const FormSummary = ({ submittedData, resetForm }) => {
  return (
    <div className="summary">
      <h2>Submission Summary</h2>
      <p><strong>Full Name:</strong> {submittedData.fullName}</p>
      <p><strong>Email:</strong> {submittedData.email}</p>
      <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
      <p><strong>Applying for Position:</strong> {submittedData.applyingForPosition}</p>
      {(submittedData.applyingForPosition === 'Developer' || submittedData.applyingForPosition === 'Designer') && (
        <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience}</p>
      )}
      {submittedData.applyingForPosition === 'Designer' && (
        <p><strong>Portfolio URL:</strong> {submittedData.portfolioURL}</p>
      )}
      {submittedData.applyingForPosition === 'Manager' && (
        <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
      )}
      <p><strong>Additional Skills:</strong> {Object.keys(submittedData.additionalSkills).filter(skill => submittedData.additionalSkills[skill]).join(', ')}</p>
      <p><strong>Preferred Interview Time:</strong> {new Date(submittedData.preferredInterviewTime).toLocaleString()}</p>
      <button onClick={resetForm}>Edit Application</button>
    </div>
  );
};

export default FormSummary;
