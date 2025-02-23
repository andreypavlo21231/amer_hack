import React, { useState } from "react";
import useBackgroundSetter from "../../useBackgroundSetter";
import defaultCompanyIcon from '../../img/icons/company-icon.svg';
import ChoiceCompanyModal from "./ChoiceCompanyModal";
import './ChoiceCompany.css';

function ChoiceCompany() {
    useBackgroundSetter();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSelectCompany = (company) => {
        setSelectedCompany(company);
        setModalOpen(true);
};

    // List of companies (can be expanded)
    const companies = [
        {
            id: 1,
            name: "JeekBrains",
            description: "We are looking for experienced Middle React programmers with at least 3 years of work experience.",
            salary: "10.000$",
            icon: defaultCompanyIcon
        },
        {
            id: 2,
            name: "TechCorp",
            description: "Development of SaaS solutions for business. A Frontend developer is required",
            salary: "8.000$",
            icon: defaultCompanyIcon
        },
        {
            id: 3,
            name: "InnoSoft",
            description: "Our company develops AI applications. Need A Senior Backend Developer",
            salary: "12.000$",
            icon: defaultCompanyIcon
        }
    ];

  // Filtering companies by name
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="choice-company__container">
            {/* Поле для поиска */}
            <div className="choice-company__search">
                <input
                    type="text"
                    className="choice-company__search-input"
                    placeholder="Enter the company name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Список компаний */}
            {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                    <div key={company.id} className="choice-company__block" onClick={() => handleSelectCompany(company)}>
                        <div className="choice-company__logo">
                            <img
                                className="choice-company__logo-image"
                                src={company.icon}
                                alt="Company icon"
                            />
                        </div>
                        <div className="choice-company__description">
                            <h2 className="choice-company__name">{company.name}</h2>
                            <p className="choice-company__description-text">{company.description}</p>
                            <p className="choice-company__description-text salary">{company.salary}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="choice-company__no-results">No companies found</p>
            )}

            {modalOpen && (
                <ChoiceCompanyModal
                    company={selectedCompany}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}

export default ChoiceCompany;
