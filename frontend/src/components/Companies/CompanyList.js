//Purpose: Display a list of all companies and a search box to filter companies.
import React, { useState, useEffect } from 'react';
import api from '../../helpers/api'; 
import CompanyCard from './CompanyCard';

function CompanyList() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            const companyData = await api.getCompanies(); 
            setCompanies(companyData);
        }

        getCompanies();
    }, []);

    return (
        <div className="company-list">
            {companies.map(company => (
                <CompanyCard key={company.handle || company.id} company={company} />
            ))}
        </div>
    );
}

export default CompanyList;
