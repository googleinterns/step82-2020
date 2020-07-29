import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Button } from 'antd';

const Home = () => {

  return (
    <body className="home-body">
      <h1 className="home-title">Clink</h1>
      <p>Organize and share links now!</p>
      <Link to="/get-started/login">
        <Button className="home-button" type="primary" size={"large"}>Log In</Button>
      </Link>
      <Link to="/get-started/sign-up">
        <Button className="home-button" type="primary" size={"large"}>Sign Up</Button>
      </Link>
    </body>
  );
};

export default Home;
