import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class NewModalButton extends React.Component {
  render() {
    const modal = this.props.modal;
    return (
      <Button className="new-button" type="primary" icon={<PlusOutlined />} onClick={modal.showModal}>
      New</Button>
    );
  }
}

export default NewModalButton;