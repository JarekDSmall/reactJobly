// CompanyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../helpers/api';

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      async function fetchCompany() {
          try {
              const companyData = await api.getCompany(handle); // Use handle here
              console.log("Fetched company data:", companyData); // Debugging line
              setCompany(companyData);
          } catch (err) {
              console.error("Error fetching company:", err);
              setError(err);
          }
      }

      fetchCompany();
  }, [handle]); // Use handle in the dependency array

  if (error) return <div>Error: {error.message}</div>;
  if (!company) return <div>Loading...</div>;

  return (
      <div>
          <h2>{company.name}</h2>
          <p>Description: {company.description}</p>
          <p>Number of Employees: {company.numEmployees}</p>
          {company.logoUrl && <img src={company.logoUrl} alt={`${company.name} logo`} />}
          {/* Add more details as needed */}
      </div>
  );
}

export default CompanyDetail;
