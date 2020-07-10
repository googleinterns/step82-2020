import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Collapse } from 'antd';
import BookmarkMenu from './bookmarkmenu'

const { Panel } = Collapse;

const Card = () => {
  const [activeKey, setActiveKey] = useState('');

  return(
    <div onMouseEnter={() => {
      setActiveKey('1')
    }
    } onMouseLeave={() => {
      setActiveKey('0')
    }
    }> 
    <Collapse accordion activeKey={activeKey} className="card" bordered={false}>
      <Panel style={{ border: '0px'}} showArrow={false} header={<div className="card-header">This is a card header <BookmarkMenu /></div>} key="1">
        <p>Card info</p>
      </Panel>
    </Collapse>
    </div>
  )
}

export default Card