import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase'; // Ensure Firebase is correctly initialized
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // For redirection
import '../styles/SlidingLoginForm.css'; // Ensure this path is correct

const SlidingLoginForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate(); // For navigation


  // Handle Sign Up click
  const handleSignUpClick = () => {

    setIsRightPanelActive(true);
    setErrorMessage(''); // Reset error message when switching forms

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setIsRightPanelActive(true);
      setErrorMessage('');
    }

  };

  // Handle Sign In click
  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    setErrorMessage(''); // Reset error message when switching forms
  };

  // Handle Sign Up with Firebase
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrorMessage('');

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optionally store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date(),
      });

      // Get Firebase ID token
      const token = await user.getIdToken();

      // Send token to Django backend for verification
      const response = await fetch('http://localhost:8000/api/verify-token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('Token verified with Django:', data.uid);
        // Redirect to Profile page after successful sign up
        navigate('/profile');
      } else {
        setErrorMessage('Token verification failed.');
        console.error('Token verification failed:', data.message);
      }

    } catch (error) {
      setErrorMessage(error.message || 'Sign up failed.');
      console.error('Error during sign up:', error.message);
    }
  };

  // Handle Sign In with Firebase
  const handleSignIn = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrorMessage('');

    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get Firebase ID token
      const token = await user.getIdToken();

      // Send token to Django backend for verification
      const response = await fetch('http://localhost:8000/api/verify-token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('Token verified with Django:', data.uid);
        // Redirect to Profile page after successful sign in
        navigate('/profile');
      } else {
        setErrorMessage('Token verification failed.');
        console.error('Token verification failed:', data.message);
      }

    } catch (error) {
      setErrorMessage('Invalid email or password.');
      console.error('Error during sign in:', error.message);
    }
  };

  return (

    <div className="sliding-login-form"> {/* Parent class for scoping styles */}
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password" // Added confirm password field
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            <button type="submit">Sign In</button>
            {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
          </form>
        </div>

        {/* Overlay for switching between Sign Up and Sign In */}

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Get Started</h1>
              <p>Where Every Sign Speaks</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>Where Every Sign Speaks</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingLoginForm;
