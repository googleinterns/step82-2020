import React from 'react';
import 'antd/dist/antd.css';
import '../../../index.css';
import { Tabs } from 'antd';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const GetStartedPage = () => {

  return (
    <Tabs className="center-tabs" defaultActiveKey="login" onChange={callback}>
      <TabPane tab="Login" key="login">
        <LoginPage />
      </TabPane>
      <TabPane tab="Sign Up" key="sign-up">
        <SignUpPage />
      </TabPane>
    </Tabs>
  );
}

export default GetStartedPage;
