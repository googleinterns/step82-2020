import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout, Button } from 'antd';

const Home = () => {
  return (
    <body className="home-body">
      <h1 className="home-title">Clink</h1>
      <p>Organize and share links now!</p>
      <Button className="home-btn" type="primary" size={"large"}>Log In</Button>
      <Button className="home-btn" type="primary" size={"large"}>Sign Up</Button>
    </body>
  );
}


export default Home;
