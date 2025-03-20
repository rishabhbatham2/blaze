import React, { useState } from "react";
import ReusableInput from "../../components/ui/ReusableInput/Reusable";
import { postData } from "../../services/NodeServices";
import { toast } from "react-toastify";

export default function ResetPass({ onBackToLogin }) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState({});

    const handleError = (name, value) => {
        setError(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = () => {
        if (!email.trim()) return handleError('email', 'Email is required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return handleError('email', 'Invalid email format');
        handleError('email', '');
    };

    const validatePassword = () => {
        if (!newPassword.trim()) return handleError('password', 'Password is required');
        if (newPassword.length < 8) return handleError('password', 'Password must be at least 8 characters');
        handleError('password', '');
    };
    const validatePassword2 = () => {
        if (!newPassword2.trim()) return handleError('password2', 'Password is required');
        if (newPassword2.length < 8) return handleError('password2', 'Password must be at least 8 characters');
        handleError('password', '');
    };

    const handleSendOtp = async () => {
        validateEmail();
        if (error.email) return;

        try {
            const result = await postData('api/users/haveaccount', { email });
            if(result.status){
                const result2 = await postData('api/users/send-otp', { email });
                if (result2.status) {
                    toast.success('OTP sent to your email');
                    setStep(2);
                } else {
                    toast.error(result2.message);
                }
            }else{
                toast.error(result.message)
            }
        } catch {
            toast.error('Server error');
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) return handleError('otp', 'OTP is required');

        try {
            const result = await postData('api/users/verify-otp', { email, otp });
            if (result.status) {
                toast.success('OTP verified');
                setStep(3);
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error('Server error');
        }
    };

    const handleResetPassword = async () => {
        validatePassword();
        if (error.password) return;

        try {
            const result = await postData('api/users/reset-password', { email, newpass:newPassword,otp });
            if (result.status) {
                toast.success('Password reset successfully');
                window.location.href = "/log-in";
            } else {
                toast.error(result.message);
            }
        } catch {
            toast.error('Server error');
        }
    };

    return (
        <div className="login__cont">
            <div className="loginner">
                {step === 1 && (
                    <>
                        <label className="loglabell">Reset Password</label>
                        <ReusableInput 
                            value={email}
                            placeholder="Enter your email"
                            label="Email"
                            setValue={setEmail}
                         /*    onBlur={validateEmail} */
                            onKeyDown={() => { validateEmail() }}
                           /*  onFocus={() => { handleError('email', '') }} */
                            errorlabel={error.email}
                        />
                        <button className="logbutton" onClick={handleSendOtp}>Send OTP</button>
                        <label className="bottomlabel">
                            Remember password? <span onClick={onBackToLogin}>Login</span>
                        </label>
                    </>
                )}

                {step === 2 && (
                    <>
                        <label className="loglabell">Enter OTP</label>
                        <ReusableInput 
                            value={otp}
                            placeholder="Enter OTP"
                            label="OTP"
                            setValue={setOtp}
                            errorlabel={error.otp}
                            
                        />
                        <button className="logbutton" onClick={handleVerifyOtp}>Verify OTP</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <label className="loglabell">Reset Password</label>
                        <ReusableInput 
                            value={newPassword}
                            placeholder="Enter new password"
                            label="New Password"
                            setValue={setNewPassword}
                            onBlur={validatePassword}
                            errorlabel={error.password}
                            onKeyDown={() => { validatePassword() }}
                            
                        />
                          <ReusableInput 
                            value={newPassword2}
                            placeholder="Enter new password"
                            label="New Password"
                            setValue={setNewPassword2}
                            onKeyDown={() => { validatePassword2() }}
                            errorlabel={error.password2}
                        />
                        <button className="logbutton" onClick={handleResetPassword}>Reset Password</button>
                    </>
                )}
            </div>
        </div>
    );
}
