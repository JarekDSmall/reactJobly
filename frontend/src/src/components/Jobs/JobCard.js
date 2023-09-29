import React, { useState } from 'react';
import JoblyApi from '../helpers/api';

function JobCard({ job }) {
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    await JoblyApi.applyForJob(job.id);
    setApplied(true);
  };

  return (
    <div className="JobCard">
      <h2>{job.title}</h2>
      <p>{job.companyName}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}

export default JobCard;
