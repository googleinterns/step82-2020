import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound = () => {

  const currentClinkId = useSelector(state => state.clink.currentClinkId);

  return (
    <Result
      className="center"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={"/dashboard/" + currentClinkId} >
          <Button type="primary">Back Dashboard</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
