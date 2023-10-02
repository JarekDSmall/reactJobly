import React, { useState } from 'react';

function JobCard({ job }) {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
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
