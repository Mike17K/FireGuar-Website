import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./SignIn.css";
import {signInWithGoogle} from '../../services/firebase/firebaseAuth';
import { AuthContext } from '../../contexts/AuthContext';


export default function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if(currentUser){
      navigate("/");
    }
  }
  , [currentUser,navigate]);

  return (
    <section className='signin'>
      <Link to="/" className="logo">FireGuard</Link>
      <div className='providers-wrapper'>
        <h2>Continue with your account</h2>
        <p>Login or register using one of the methods below.</p>
        <div className='providers-list'>
          <button onClick={e => signInWithGoogle()} className='google'>Continue with Google</button>
          <button onClick={async e => {}} className='apple'>Continue with Apple</button>
          <button onClick={async e => {}} className='facebook'>Continue with Facebook</button>
        </div>
        <p className='seperator-text'><span>or continue with your email</span></p>
        <input type="text" placeholder="Email" />
        <div className='checkbox'>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">This is a public or shared computer</label>
        </div>
        <p>
          <span>By signing up you accept our </span>
          <Link to="/termsandconditions">Terms of Use.</Link>
          <span>Check here our </span>
          <Link to="/privacypolicy">Privacy Policy.</Link>          
          </p>
      </div>
        <p className='footer-text'>{"© 20[0-9]{2} Skroutz Α.Ε. All Rights and Lefts reserved."}<Link to="/privacypolicy">FAQ - Terms of use</Link> | <Link to="/privacypolicy">Privacy Policy</Link> | <Link to="/privacypolicy">Cookie Policy</Link></p>
    </section>
  )
}
