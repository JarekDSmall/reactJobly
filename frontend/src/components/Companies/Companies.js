// Companies.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import api from '../../helpers/api';
import './Companies.css'

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companiesData = await api.getCompanies(); // Assuming you have a method to fetch all companies
        setCompanies(companiesData);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for a company..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCompanies.map(company => (
          <li key={company.handle}>
            {/* Wrap the company name in a Link component */}
            <Link to={`/companies/${company.handle}`}>
              {company.name}
            </Link>
            {/* Add more details or links as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
