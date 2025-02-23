import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AuthForm({ setAuth }) {
	const location = useLocation();
	const isEmployeePath = location.pathname === '/auth-employee';
	const registerPath = isEmployeePath ? '/register-employee' : '/register-worker';
	const inputRefs = useRef([]);
	const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
	let password = '';
	let email = '';
    if (isEmployeePath) {
      formData = {
        email: inputRefs.current[0]?.value || '',
        password: inputRefs.current[1]?.value || '',
        INN: inputRefs.current[2]?.value || '',
        account_type: "Employer",
      };
	  password=inputRefs.current[1]?.value || '';
	  email=inputRefs.current[0]?.value || '';
    } else {
      formData = {
        email: inputRefs.current[0]?.value || '',
        password: inputRefs.current[1]?.value || '',
        account_type: "Worker",
      };
	  password=inputRefs.current[1]?.value || '';
	  email=inputRefs.current[0]?.value || '';
    }

    try {
		if (!isEmployeePath){
			const response = await axios.post(process.env.REACT_APP_BACK_API+'/api/worker/login', {
               email:email,  password:password
            });
            localStorage.setItem('token', response.data.access_token);
            setAuth(true);
            navigate('/profile');

        
		}
		else{
			const response = await axios.post(process.env.REACT_APP_BACK_API+'/api/employer/login', {
               email:email,  password:password
            });
            localStorage.setItem('token', response.data.access_token);
            setAuth(true);
            navigate('/profile');
		}
	} catch (error) {
          console.log(error);
        }
  };

  return (
    <div className="form__auth">
      <div className="auth__content">
        <form onSubmit={handleSubmit} action="#" method="post">
          <input
            type="email"
            className="form__input email-input"
            name="email-input"
            placeholder="Your mail"
            ref={(el) => (inputRefs.current[0] = el)}
            required
          />
          <input
            type="password"
            className="form__input password-input"
            name="password-input"
            placeholder="Your password"
            ref={(el) => (inputRefs.current[1] = el)}
            required
          />
          {isEmployeePath && (
            <input
              type="text"
              className="form__input inn-input"
              name="inn-input"
              placeholder="INN"
              ref={(el) => (inputRefs.current[2] = el)}
              required
            />
          )}
          <button className="submit-button auth__button" type="submit">
            Войти
          </button>
          <div className="auth__link-container">
            <span className="auth__span">
            Forgot your password? <Link className="auth__link" to="/reset-password">Recover</Link>
            </span>
            <span className="auth__span">
            No account? <Link className="auth__link" to={registerPath}>To create</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
