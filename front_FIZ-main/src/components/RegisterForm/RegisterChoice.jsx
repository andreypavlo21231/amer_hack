import React from "react";
import './RegisterChoice.css';
import userIcon from '../../img/user.png';
import { Link, useLocation } from 'react-router-dom';

function RegisterChoice() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="choice-container">
            <div className="choice__employee">
                <Link to={isHomePage ? "/auth-employee" : "/register-employee"}>
                    <img className="choice__icon employee__icon" src={userIcon} alt="User icon" />
                    <h2 className="choice__title">Employer</h2>
                </Link>
            </div>

            <div className="choice-divider"></div>

            <div className="choice__worker">
                <Link to={isHomePage ? "/auth-worker" : "/register-worker"}>
                    <img className="choice__icon worker__icon" src={userIcon} alt="User icon" />
                    <h2 className="choice__title">Employee</h2>
                </Link>
            </div>
        </div>
    );
}

export default RegisterChoice;
