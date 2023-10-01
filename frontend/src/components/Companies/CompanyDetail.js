import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../helpers/api';
import JobCard from '../Jobs/JobCard';  // Import the JobCard component

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompanyAndJobs() {
      try {
        const companyData = await api.getCompany(handle);
        setCompany(companyData);
        const companyJobs = await api.getJobsByCompany(handle); // Assuming you have a method to get jobs by company
        setJobs(companyJobs);
      } catch (err) {
        console.error("Error fetching company:", err);
        setError(err);
      }
    }

    fetchCompanyAndJobs();
  }, [handle]);

  if (error) return <div>Error: {error.message}</div>;
  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>Description: {company.description}</p>
      <p>Number of Employees: {company.numEmployees}</p>
      {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} logo`} />}
      <h3>Jobs at {company.name}</h3>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default CompanyDetail;
