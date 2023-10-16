import React, { useState } from 'react';
import { Card } from 'antd';

const UserCard = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      hoverable
      style={{ width: 300, margin: 16, marginLeft: '3%'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
            {!isHovered ? (
                <div>
                    <img src={user.avatar} width={200} height={200}></img>
                    <p style={{font : '22px bold'}}>{user.first_name + ' ' +user.last_name}</p>
                    <p>UserName : {user.username}</p>
                    <p>Gender : {user.gender}</p>
                    <p>Birthday : {user.date_of_birth}</p>
                    <p>Address : {user.address.city}</p>
                </div>
            ) : (
                <div>
                    <p style={{font : '20px bold'}}>{user.first_name + ' ' +user.last_name}</p>
                    <p>UserName : {user.username}</p>
                    <p>Gender : {user.gender}</p>
                    <p>Birthday : {user.date_of_birth}</p>
                    <p>Address : {user.address.city}</p>
                    <p>Email: {user.email}</p>
                    <p>Credit_card : {user.credit_card.cc_number}</p>
                    <p>Email : {user.email}</p>
                    <p>Password : {user.password}</p>
                    <p>Phone Number : {user.phone_number}</p>
                    <p>SN : {user.social_insurance_number}</p>
                </div>
            )}
    </Card>
  );
};

export default UserCard;