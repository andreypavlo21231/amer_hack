import React, { useState } from "react";
import "./ChoiceCompanyModal.css";

function ChoiceCompanyModal({ company, onClose }) {
    const [isSelected, setIsSelected] = useState(false);

    if (!company) return null;

    const handleAddResume = (e) => {
        e.preventDefault();
        // A stub for sending your resume
        onClose();
    }

    return (
        <div className="choice-company-modal">
            <div className="choice-company-modal__overlay" onClick={onClose}></div>
            <div className="choice-company-modal__content">
                <button className="choice-company-modal__close" onClick={onClose}>
                    ×
                </button>
                <div className="choice-company-modal__header">
                    <img
                        className="choice-company-modal__logo"
                        src={company.icon}
                        alt={`Логотип ${company.name}`}
                    />
                    <h2 className="choice-company-modal__title">{company.name}</h2>
                </div>
                <div className="choice-company-modal__body">
                    <p className="choice-company-modal__description">
                        {company.description}
                    </p>
                    <p className="choice-company-modal__salary">
                        {company.salary}
                    </p>
                </div>
                <button className="choice-company-modal__add-resume" onClick={handleAddResume}>
                Send Your resume
                </button>
            </div>
        </div>
    );
}

export default ChoiceCompanyModal;
