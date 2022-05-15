import React from 'react';

export default function UserItem({ user, addedUsers, addedUserstoList }) {
  const isUserAddded = addedUsers.includes(user);
  return (
    <div >
      <img src='' />
      <h3>{user.name}</h3>
      <h4>{user.jobTitle}</h4>
      {!isUserAddded && (
        <p onClick={() => !isUserAddded && addedUserstoList(user)}>+</p>
      )}
    </div>
  );
}
