// Purpose: Display basic information about a company.
import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
  console.log("Company ID:", company.id); // Debugging line to check the company id
  return (
      <Link to={`/companies/${company.id}`}>
          <div className="company-card">
              <h3>{company.name}</h3>
              {company.logo && <img src={company.logo} alt={company.name} />}
          </div>
      </Link>
  );
}

export default CompanyCard;
