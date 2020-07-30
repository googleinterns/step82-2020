import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBookmarks, clearBookmarks } from '../../features/clink';
import 'antd/dist/antd.css';
import '../../index.css';
import { Collapse } from 'antd';
import BookmarkMenu from './bookmarkmenu';


const { Panel } = Collapse;

const Card = () => {  
  
  const [activeKey, setActiveKey] = useState('');

  const currentToken = localStorage.getItem('currentToken');
  const bookmarks = useSelector(state => state.clink.bookmarks);
  const isCurrentUserFetched = useSelector(state => state.users.isCurrentUserFetched);
  const clinkId = useSelector(state => state.clink.currentClinkId);

  const dispatch = useDispatch();
  const history = useHistory();

  const urlString = new URLSearchParams(history.location.search);
  const urlParam = urlString.get("search") || "";

  useEffect(() => {
    if (isCurrentUserFetched) {
      dispatch(clearBookmarks());
      dispatch(fetchBookmarks(currentToken, clinkId));
    }
  }, [clinkId]);

  return(
    <>
    {bookmarks.filter(bmark => bmark.title.toLowerCase().includes(urlParam.toLowerCase())).map(bmark => (
      <>
      <div onMouseEnter={() => {
        setActiveKey(bmark.id)
      }
      } onMouseLeave={() => {
        setActiveKey('0')
      }
      }> 
        <Collapse accordion activeKey={activeKey} className="card" bordered={false}>
          <Panel style={{ border: '0px'}} showArrow={false} header={<a className="bookmark-link" href={bmark.link} target="_blank">{<div className="card-header">{bmark.title}<BookmarkMenu key={bmark.id} id={bmark.id} /></div>}</a>} key={bmark.id}>
            <p>{bmark.description}</p>
          </Panel>
        </Collapse>
        <br />
      </div>
      </>
    ))}
    </>
  )
};

export default Card;
