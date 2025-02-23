import React, { useState, useEffect, useRef } from "react";
import AddressInput from './AddressInput';
import userIcon from '../../img/user.png';
import './RegisterFormEmployee.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RegisterFormEmployee() {
    const inputRefs = useRef([]);
    const [profileImage, setProfileImage] = useState(userIcon);
    const fileInputRef = useRef(null);
	const navigate = useNavigate();
    useEffect(() => {
        const updatePadding = () => {
            inputRefs.current.forEach(input => {
                const label = input?.previousElementSibling;
                if (label) {
                    const labelWidth = label.offsetWidth;
                    const padding = 20;
                    input.style.paddingLeft = `${labelWidth + padding}px`;
                }
            });
        };

        const timeout = setTimeout(updatePadding, 100);

        window.addEventListener('resize', updatePadding);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updatePadding);
        };
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
		const formData = new FormData();
		formData.append('name', inputRefs.current[0].value);
		formData.append('email', inputRefs.current[1].value);
		formData.append('phone', inputRefs.current[2].value);
		formData.append('password', inputRefs.current[3].value);
		formData.append('address', inputRefs.current[4].value);
		
		formData.append('account_type', "Employer");
		if (fileInputRef.current.files[0]) {
			formData.append("profile_image", fileInputRef.current.files[0]);
		}

        try {
            const response = await axios.post(process.env.REACT_APP_BACK_API+'/api/employer/register', {
                name:inputRefs.current[0].value, email:inputRefs.current[1].value, phone:inputRefs.current[2].value, password:inputRefs.current[3].value
            });
            navigate('/auth-employee');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration__form form__employee">
                <form className="registr-form" onSubmit={handleSubmit}>
                    <div className="registration__role">
                        <img className="choice__icon employee__icon registration__icon--fix" src={profileImage} alt="User icon" />
                        <h2 className="choice__title">Employer</h2>
                        <button
                            className="choice__change-image"
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Choose your photo
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </div>

                    <div className="registr-inputs">
                        <div className="input-container">
                            <label htmlFor="name-of-company" className="floating-label">Company name</label>
                            <input
                                type="text"
                                className="form__input"
                                name="name-of-company-input"
                                required
                                id="name-of-company"
                                ref={el => inputRefs.current[0] = el}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="email" className="floating-label">Email</label>
                            <input
                                type="email"
                                className="form__input"
                                name="email-input"
                                required
                                id="email"
                                ref={el => inputRefs.current[1] = el}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="phone" className="floating-label">Telephone</label>
                            <input
                                type="tel"
                                className="form__input"
                                name="phone-number-input"
                                required
                                id="phone"
                                ref={el => inputRefs.current[2] = el}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="password" className="floating-label">Password</label>
                            <input
                                type="password"
                                className="form__input"
                                name="password"
                                required
                                id="password"
                                ref={el => inputRefs.current[3] = el}
                            />
                        </div>

                        <AddressInput ref={el => inputRefs.current[4] = el} />

                        <div className="input-container">
                            <label htmlFor="inn-company" className="floating-label">INN</label>
                            <input
                                type="text"
                                className="form__input"
                                name="inn-company"
                                required
                                id="inn-company"
                                ref={el => inputRefs.current[5] = el}
                            />
                        </div>

                        <button className="submit-button auth__button" type="submit">
                        Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterFormEmployee;
