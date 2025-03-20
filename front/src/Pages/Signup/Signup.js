import React, { useContext, useState } from "react";
import './Signup.css';
import ReusableInput from "../../components/ui/ReusableInput/Reusable";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../services/NodeServices";
import { toast } from "react-toastify";
import { MyContext } from "../../context/MyContext";

export default function SignUp() {
    const { loginUser } = useContext(MyContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Custom regular expressions
    const firstNameRegex = /^[a-zA-Z\s]+$/; // Only letters
    const lastNameRegex = /^[a-zA-Z\s]+$/; // Only letters
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/; // Valid email
    const mobileRegex = /^[0-9]$/; // 10-digit number
    const passwordRegex = /^/; // Complex password (min 8 chars, uppercase, lowercase, number, special char)

    const handleError = (name, value) => {
        setError((prevError) => ({
            ...prevError,
            [name]: value,
        }));
    };

    // Custom validation functions for each field
    const validateFirstName = () => {
        if (!firstName) {
            handleError('firstName', 'First name is required');
        } else if (!firstNameRegex.test(firstName)) {
            handleError('firstName', 'First name must contain only letters');
        } else {
            handleError('firstName', '');
        }
    };

    const validateLastName = () => {
        if (!lastName) {
            handleError('lastName', 'Last name is required');
        } else if (!lastNameRegex.test(lastName)) {
            handleError('lastName', 'Last name must contain only letters');
        } else {
            handleError('lastName', '');
        }
    };

    const validateEmail = () => {
        if (!email || !email.includes('@')) {
            handleError('email', 'Email is required');
        } 
         else {
            handleError('email', ''); 
        }
    };

    const validateMobile = () => {
        if (!mobile || mobile.length!=10) {
            handleError('mobile', 'Mobile number must be 10 digits');
        } else {
            handleError('mobile', '');
        }
    };

    const validatePassword = () => {
        if (!pass || pass.trim() === '') {
            handleError('password', 'Password is required');
        } else if (!passwordRegex.test(pass)) {
            handleError('password', 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character');
        } else {
            handleError('password', '');
        }
    };

    const isFormValid = () => {
        return Object.values(error).every((value) => value === '');
    };

    const handleSignUp = async () => {
        const body = {
            email: email,
            password: pass,
            firstname: firstName,
            lastname: lastName,
            mobile: mobile
        };

        if (pass && email && isFormValid()) {
            try {
                const result = await postData('api/users/signu', body);

                if (result.status) {
                    toast.success('Successfully signed up!');
                  /*   loginUser(result.data.user);
                    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/'; */
                    navigate('/log-in');
                } else {
                    toast.error(result.message);
                }
            } catch {
                toast.error('Server error');
            }
        }
       console.log(body)
    };

    return (
        <div className="signup__cont">
            <div className="signinner">
                <label className="signuplabel">
                    Sign Up
                </label>

                <ReusableInput
                    value={firstName}
                    placeholder={'Enter first name'}
                    label={'First Name'}
                    setValue={setFirstName}
                    onKeyDown={() => { validateFirstName() }}
                    errorlabel={error.firstName}
                    onFocus={() => { handleError('firstName', '') }}
                    regex={firstNameRegex}
                />

                <ReusableInput
                    value={lastName}
                    placeholder={'Enter last name'}
                    label={'Last Name'}
                    setValue={setLastName}
                    onKeyDown={() => { validateLastName() }}
                    errorlabel={error.lastName}
                    onFocus={() => { handleError('lastName', '') }}
                    regex={lastNameRegex}
                />

                <ReusableInput
                    value={email}
                    placeholder={'Enter email address'}
                    label={'Email'}
                    setValue={setEmail}
                    onKeyDown={() => { validateEmail() }}
                    errorlabel={error.email}
                    onFocus={() => { handleError('email', '') }}
                   
                />

                <ReusableInput
                    value={mobile}
                    placeholder={'Enter mobile number'}
                    label={'Mobile Number'}
                    setValue={setMobile}
                    onKeyDown={() => { validateMobile() }}
                    errorlabel={error.mobile}
                    onFocus={() => { handleError('mobile', '') }}
                    maxLength={10}
                    regex={mobileRegex}
                />

                <ReusableInput
                    value={pass}
                    placeholder={'Enter password'}
                    label={'Password'}
                    setValue={setPass}
                    onFocus={() => { handleError('password', '') }}
                    onKeyDown={() => { validatePassword() }}
                    errorlabel={error.password}
                    
                />

                <button className="logbutton" onClick={handleSignUp}>Sign Up</button>
                <label className="bottomlabel">Already have an account?  <span onClick={()=>{navigate('/log-in')}}>Login</span></label>
            </div>
        </div>
    );
}
