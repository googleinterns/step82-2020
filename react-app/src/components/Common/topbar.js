import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import ShareModal from './sharemodal';
import EllipsisModalButton from './ellipsismodalbutton';

const { Header } = Layout;

const Topbar = () => {
  return (
    <Header style={{ position: 'relative', height: '153px' }} >
      <ShareModal render={modal => (<EllipsisModalButton modal={modal} />)} id="hello!" />
    </Header>
  )
}

export default Topbar;