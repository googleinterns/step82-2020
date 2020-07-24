import React from 'react';
import { useParams } from "react-router-dom";
import 'antd/dist/antd.css';
import '../../../index.css';
import { Tabs } from 'antd';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';

const { TabPane } = Tabs;

const GetStartedPage = () => {

  let { form } = useParams();
  console.log("this is " + form);

  return (
    <Tabs className="center-tabs" defaultActiveKey={form}>
      <TabPane tab="Login" key="login">
        <LoginPage />
      </TabPane>
      <TabPane tab="Sign Up" key="sign-up">
        <SignUpPage />
      </TabPane>
    </Tabs>
  );
};

export default GetStartedPage;
