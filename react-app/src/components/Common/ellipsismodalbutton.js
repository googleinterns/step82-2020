import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class EllipsisModalButton extends React.Component {
  render() {
    const modal = this.props.modal;
    console.log(modal)
    return (
      <Button className="new-button" type="primary" icon={<EllipsisOutlined />} onClick={modal.showModal}>
      open modal!</Button>
    );
  }
}

export default EllipsisModalButton;