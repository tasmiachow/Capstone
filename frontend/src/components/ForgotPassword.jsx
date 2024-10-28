import { useState } from 'react';
import '../styles/ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // add functionality for resetting password firebase
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleResetPassword}>Send Reset Link</button>
    </div>
  );
};

export default ForgotPassword;
