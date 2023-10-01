import React, { useState } from 'react';
import JoblyApi from '../../helpers/api';

function JobCard({ job }) {
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    try {
      await JoblyApi.applyForJob(job.id);
      setApplied(true);
    } catch (error) {
      console.error("Error applying for job:", error);
      
    }
  };

  return (
    <div className="JobCard">
      <h2>{job.title}</h2>
      <p>{job.companyName}</p>
      <p>Salary: ${job.salary}</p>
      <p>Equity: {job.equity}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}

export default JobCard;
