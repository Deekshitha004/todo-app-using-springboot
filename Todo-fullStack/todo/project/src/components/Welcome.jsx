import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react';

import { retrieveHelloWorld } from '../api/HelloWorldApi';
import { AuthContext } from './AuthContext';
 
const Welcome = () => {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { username } = useParams();

  const authContext=useContext(AuthContext)

  function callRestApi() {
    console.log('calling rest api');
    setLoading(true); // Set loading to true when the API call starts
    retrieveHelloWorld(authContext.token)
      .then(response => successfulResponse(response))
      .catch(error => errorResponse(error))
      .finally(() => setLoading(false)); // Set loading to false when the API call completes
  }

  function successfulResponse(response) {
    console.log('API Response:', response.data);
    setMsg(response.data);
    alert(`Success: ${response.data}`); // Show response in an alert (optional)
  }

  function errorResponse(error) {
    console.error('API Error:', error);
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      alert("Error: No response received from the server. Please check your network connection.");
    } else {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>Welcome {username}</h1>
      Manage Your todos - <Link to="/todos">Go here</Link>
      <div>
        <button className='btn btn-primary' onClick={callRestApi} disabled={loading}>
          {loading ? 'Loading...' : 'Click to connect to Spring'}
        </button>
      </div>
      <div className='text-info'>
        {msg}
      </div>
    </div>
  );
};

export default Welcome;
