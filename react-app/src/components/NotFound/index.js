import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound = () => {

  return (
    <Result
      className="center-load"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/dashboard/All">
          <Button type="primary">Back Dashboard</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
