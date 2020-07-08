import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import ClinkMenu from './clinkmenu';

const { Header } = Layout;

const Topbar = () => {
  return (
    <Header style={{ position: 'relative', height: '153px' }} >
      <ClinkMenu />
    </Header>
  )
}

export default Topbar;