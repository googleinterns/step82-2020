import React from 'react';
import { useParams } from "react-router-dom";
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

  let { form } = useParams()

  return (
    <Tabs className="center-tabs" defaultActiveKey={form} onChange={callback}>
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
