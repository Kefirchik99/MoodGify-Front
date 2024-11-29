import React, { useState, useEffect } from 'react';
import '../styles/form-layout.scss';

const PasswordValidationBar = ({
    password,
    confirmPassword = '',
    rules = [],
    showWarning = false,
    isForConfirm = false,
}) => {
    const [passwordValid, setPasswordValid] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

    useEffect(() => {
        const validatePassword = (password) => {
            const validations = [
                password.length >= 8,
                /[A-Z]/.test(password),
                /[!@#$%^&*]/.test(password),
                /[0-9]/.test(password),
            ];
            return validations.every(Boolean);
        };

        if (isForConfirm) {
            setDoPasswordsMatch(password === confirmPassword);
        } else {
            setPasswordValid(validatePassword(password));
        }
    }, [password, confirmPassword, isForConfirm]);

    return (
        <div className="password-validation-container">
            {!isForConfirm && password && (
                <div
                    className={`password-bar ${passwordValid ? 'valid' : 'invalid'}`}
                ></div>
            )}
            {isForConfirm && confirmPassword && (
                <div
                    className={`password-bar ${doPasswordsMatch ? 'valid' : 'invalid'}`}
                ></div>
            )}
            {showWarning && isForConfirm && confirmPassword && !doPasswordsMatch && (
                <p className="warning-text">Passwords do not match.</p>
            )}
            {!isForConfirm && (
                <ul className="password-rules">
                    {rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PasswordValidationBar;
