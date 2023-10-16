import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, fetchMoreUsers, changeUsersRequest } from '../actions/userActions';
import { useAsyncAction } from '../actions/useAsyncActions';
import UserCard from './UserCard';

import { Button, Row, Col } from 'antd';

function UserList() {
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleFetchMoreUsers = () => {
    dispatch(fetchUsersRequest());
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      dispatch(fetchMoreUsers());
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Row style={{marginTop : '4%'}}>
        <Col span={2} offset={11}>
          <Button onClick={()=>dispatch(changeUsersRequest(users.length))} style={{width : '100%'}}>Change Users</Button>
        </Col>
      </Row>
      <Row>
        {users.map((user) => (
            <UserCard user={user} />
        ))}
      </Row>
      {/* <InfiniteScroll onScrollToEnd={()=>dispatch(fetchMoreUsers())} /> */}
    </div>
  );
}

export default UserList;