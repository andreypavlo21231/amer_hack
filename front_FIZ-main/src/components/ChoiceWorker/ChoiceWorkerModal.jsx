import React, { useState } from "react";
import './ChoiceWorkerModal.css';

function ChoiceModalWorker({ worker, onClose }) {
    const [isGradeConfirmed, setIsGradeConfirmed] = useState(worker.grade_proof || false);

    if (!worker) return null; // If there is no data about the employee, we do not render anything

    // Full information about the employee
    const workerFullInfo = [
        { label: 'About me', value: worker.about || 'No information available' },
        { label: 'Date of birth', value: worker.birth_date || 'No information available' },
        { label: 'City of stay', value: worker.city || 'No information available' },
        { label: 'Salary expectations', value: worker.salary_expectations_amount || 'No information available' },
        { label: 'Skills', value: worker.skills || 'No information available' },
        { label: 'Interview directions', value: worker.direction || 'No information available' },
        { label: 'Work experience', value: worker.work_experience || 'No information available' },
        { label: 'Education', value: worker.work_education || 'No information available' },
        { label: 'Employment (official or non-official)', value: worker.work_type || 'No information available' },
        { label: 'Previous jobs', value: worker.work_prev_works || 'No information available' },
        { label: 'Contact information', value: worker.contact || 'No information available' },
    ];

    const handleSave = (e) => {
        e.preventDefault();
        // A stub for saving qualifications
        console.log("The qualification is confirmed:", isGradeConfirmed);
        onClose();
    };

    return (
        <div className="modal-worker">
            <div className="modal-worker__overlay" onClick={onClose}></div>
            <div className="modal-worker__content">
                <button className="modal-worker__close" onClick={onClose}>×</button>
                <div className="modal-worker__details">
                    <img
                        className="modal-worker__image"
                        src={worker.icon}
                        alt={`Фотография ${worker.name}`}
                    />
                    <h2 className="modal-worker__name">{worker.name}</h2>

                    <table className="modal-worker__info-table">
                        <tbody>
                            {workerFullInfo.map((info, index) => (
                                <tr key={index} className="modal-worker__info-row">
                                    <td className="modal-worker__info-label">{info.label}:</td>
                                    <td className="modal-worker__info-value">{info.value}</td>
                                </tr>
                            ))}
                            <tr className="modal-worker__info-row">
                                <td className="modal-worker__info-label">Proof of qualifications:</td>
                                <td>
                                    <label className="modal-worker__checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={isGradeConfirmed}
                                            onChange={(e) => setIsGradeConfirmed(e.target.checked)}
                                            className="modal-worker__checkbox"
                                        />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="modal-worker__save-button" onClick={handleSave}>
                  Save
                </button>
            </div>
        </div>
    );
}

export default ChoiceModalWorker;
