import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Collapse } from 'antd';
import BookmarkModal from './bookmarkmodal'

const { Panel } = Collapse;

const Card = () => {
  const [activeKey, setActiveKey] = useState('');

  return(
    <Collapse accordion className="card" bordered={false} activeKey={activeKey}>
      <Panel style={{ border: '0px'}} showArrow={false} header={<div className="card-header" onMouseEnter={() => setActiveKey('1')} onMouseLeave={() => setActiveKey('0')}>This is a card header <BookmarkModal /></div>} key="1">
        <p>Card info</p>
      </Panel>
    </Collapse>
  )
}

export default Card