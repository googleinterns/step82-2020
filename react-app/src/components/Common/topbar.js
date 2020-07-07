import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import EllipsisMenuButton from './ellipsismenubutton';

const { Header } = Layout;

const Topbar = () => {
  return (
    <Header style={{ position: 'relative', height: '153px' }} >
      <EllipsisMenuButton />
    </Header>
  )
}

export default Topbar;