import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const Card = () => {
  const [activeKey, setActiveKey] = useState('');

  return(
    <Collapse accordion bordered={false} activeKey={activeKey}>
      <Panel showArrow={false} header={<div onMouseEnter={() => setActiveKey('1')}>This is panel header 1</div>} key="1">
        <p>Card 1 info</p>
      </Panel>
      <Panel showArrow={false} header={<div onMouseEnter={() => setActiveKey('2')}>This is panel header 1</div>} key="2">
        <p>Card 2 info</p>
      </Panel>
      <Panel showArrow={false} header={<div onMouseEnter={() => setActiveKey('3')}>This is panel header 1</div>} key="3">
        <p>Card 3 info</p>
      </Panel>
    </Collapse>
  )
}

export default Card