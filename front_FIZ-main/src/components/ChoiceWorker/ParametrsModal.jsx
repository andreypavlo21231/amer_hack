import './ParametrsModal.css';
import { useState } from 'react';

function ParametrsModal({ onClose }) {
    const [formData, setFormData] = useState({
        direction: '',
        position: '',
        country: '',
        city: '',
        salary_expectations_amount: '',
        skills: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending the data:", formData);

        try {
            const response = await fetch(process.env.REACT_APP_BACK_API+'/api/employer/save_parameters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add JWT token from local storage
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('The data has been sent successfully.');
                onClose(); // Close the modal after successful save
            } else {
                console.error('Error when sending data.');
            }
        } catch (error) {
            console.error('Mistake:', error);
        }
    };

    return (
        <div className="parametrs-modal">
            <div className="parametrs-modal__content">
                <h2 className="parametrs-modal__title">Edit Parameters</h2>
                <form className="parametrs-modal__form" onSubmit={handleSubmit}>
                    <div className="parametrs-modal__input-group">
                        <label htmlFor="direction" className="parametrs-modal__label">Destinations where the candidate was interviewed</label>
                        <input
                            type="text"
                            id="direction"
                            className="parametrs-modal__input"
                            value={formData.direction}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="parametrs-modal__input-group">
                        <label htmlFor="position" className="parametrs-modal__label">The position for which the candidate was interviewed</label>
                        <input
                            type="text"
                            id="position"
                            className="parametrs-modal__input"
                            value={formData.position}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="parametrs-modal__input-group">
                        <label htmlFor="country" className="parametrs-modal__label">Country of residence</label>
                        <input
                            type="text"
                            id="country"
                            className="parametrs-modal__input"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="parametrs-modal__input-group">
                        <label htmlFor="city" className="parametrs-modal__label">City of stay</label>
                        <input
                            type="text"
                            id="city"
                            className="parametrs-modal__input"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="parametrs-modal__input-group">
                        <label htmlFor="salary_expectations_amount" className="parametrs-modal__label">Salary expectations</label>
                        <input
                            type="number"
                            id="salary_expectations_amount"
                            className="parametrs-modal__input"
                            value={formData.salary_expectations_amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="parametrs-modal__input-group">
                        <label htmlFor="skills" className="parametrs-modal__label">Skills</label>
                        <textarea
                            id="skills"
                            className="parametrs-modal__textarea"
                            value={formData.skills}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="parametrs-modal__actions">
                        <button type="submit" className="parametrs-modal__button">Save</button>
                        <button type="button" className="parametrs-modal__button" onClick={onClose}>To close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ParametrsModal;
