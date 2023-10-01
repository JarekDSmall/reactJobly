// JobList.js
import React, { useState, useEffect } from 'react';
import api from '../../helpers/api'; // Assuming you have an API helper
import JobCard from './JobCard';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const fetchedJobs = await api.getJobs(); // Assuming you have a getJobs method in your API helper
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
