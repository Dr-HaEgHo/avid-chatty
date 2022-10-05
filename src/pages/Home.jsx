import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../store/server.config';

const Home = () => {

    const navigate = useNavigate()

    const logout = () => {
        auth.signOut();
        navigate("/sign-up")
    }

  return (
      <div>Hello, Kelly! <br /> Welcome to your Chat Dashboard Meet your friends
        <button onClick={() => logout()}>Logout</button>
      </div>
  )
}

export default Home;