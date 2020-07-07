import React from 'react';
import { buttonClicked, setButtonType, resetHomeState } from '../../features/home';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import '../../index.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Home = () => {

  const dispatch = useDispatch()

  const loginButton = "login"
  const signUpButton = "sign-up"

  const dispatchLogin = () => {
    try {
      dispatch(buttonClicked())
      dispatch(setButtonType(loginButton))
    } catch (err) {
      dispatch(resetHomeState(err.toString()))
    }
  }

  const dispatchSignUp = () => {
    try {
      dispatch(buttonClicked())
      dispatch(setButtonType(signUpButton)) 
    } catch (err) {
      dispatch(resetHomeState(err.toString()))
    }
  }

  return (
    <body className="home-body">
      <h1 className="home-title">Clink</h1>
      <p>Organize and share links now!</p>
      <Link to="/get-started">
        <Button className="home-button" type="primary" size={"large"} onClick={dispatchLogin}>Log In</Button>
      </Link>
      <Link to="/get-started">
        <Button className="home-button" type="primary" size={"large"} onClick={dispatchSignUp}>Sign Up</Button>
      </Link>
    </body>
  );
}

export default Home;
