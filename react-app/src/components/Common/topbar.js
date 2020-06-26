import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';

const { Header } = Layout;

const Topbar = () => {
  return (
    <Header style={{ position: 'relative', height: '153px' }} />
  )
}

export default Topbar;