import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the API and update the state
    // For example:
    // async function fetchJobs() {
    //   const response = await api.getJobs(); // Assuming you have an api helper
    //   setJobs(response);
    // }
    // fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
