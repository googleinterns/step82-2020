import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Modal, Button } from 'antd';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, visible: false };
  }
  // state = {
  //   loading: false,
  //   visible: false,
  // };

  showModal = () => {
    console.log('showing modal!')
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        {this.props.render(this)}
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default ModalWindow