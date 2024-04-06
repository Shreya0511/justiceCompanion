import React from 'react'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <div className = "mb-2 me-2">
      <Stack direction="vertical" gap={5}></Stack>
      <Badge bg="danger" className = "d-flex flex-row bd-highlight mb-2"><div className = "p-2 bd-highlight">{user.name}</div>
      <div className = "p-2 bd-highlight" onClick = {handleFunction}>X</div> </Badge>
      <Stack />{'   '}
      
    </div>
  )
}

export default UserBadgeItem
