import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class EllipsisModalButton extends React.Component {
  render() {
    const modal = this.props.modal;
    return (
      <Button className="new-button" type="primary" icon={<EllipsisOutlined />} onClick={modal.showModal} />
    );
  }
}

export default EllipsisModalButton;
