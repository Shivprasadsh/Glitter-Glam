import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../Redux/feature/auth/authApi'; // Ensure this import path is correct

const Register = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhnNumber] = useState('');
  const [username, setUserName] = useState('');

  // Ensure you're calling the hook as a function
  // const [registerUser,  {isLoading:register}] = useRegisterMutation();
  // const navigate = useNavigate();

  const [registerUser,{isLoading}]= useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      phonenumber,
      username,
    };
    try {
      await registerUser(data).unwrap();
      alert('Register successful');
      navigate('/login');
    } catch (error) {
      setMessage('Registration Failed');
    }
  };

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow bg-white mx-auto p-4'>
        <h2 className='text-xl font-semibold pt-5'>Register</h2>
        <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
            required
            className="w-full bg-gray-800 text-white focus:outline-none px-5 py-3"
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full bg-gray-800 text-white focus:outline-none px-5 py-3"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-gray-800 text-white focus:outline-none px-5 py-3"
          />
          <input
            type="tel"
            name="tel"
            id="tel"
            onChange={(e) => setPhnNumber(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full bg-gray-800 text-white focus:outline-none px-5 py-3"
          />
          {message && <p className='text-red-500'>{message}</p>}
          <button
            type='submit'
            className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
          >
            Register
          </button>
        </form>
        <p className='my-5 italic text-sm text-center'>
          Already have an account? <Link to='/login' className='text-indigo-600 hover:underline'>Login</Link> here
        </p>
      </div>
    </section>
  );
};

export default Register;
