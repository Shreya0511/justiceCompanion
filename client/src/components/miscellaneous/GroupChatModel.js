import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AuthData } from '../../services/AuthService';
import getCookies from '../../hooks/getCookies';
import axios from 'axios';
import UserListItem from '../userAvator/UserListItem';
import UserBadgeItem from '../userAvator/UserBadgeItem';

const GroupChatModel = ({children}) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const {user, chats, setChats} = AuthData();
    
    const handleClose = () => {
      setSearch("");
      setSelectedUser([]);
      setLoading(false);
      setGroupChatName("");
      setSearchResult([]);
      setShow(false);
    }
  const handleSearch = async (query) => {
    setSearch(query);
    // if(!query){
    //     return;
    // }

    try{
        setLoading(true);

        const config = {
            headers: {
                authorization : `Bearer ${getCookies("jwt")}`,
            },
        }
        console.log("search", search);
        const {data} = await axios.get(`http://127.0.0.1:5001/api/v1/users/searchUsers?search=${search}`, config);
        console.log("data", data);
        setSearchResult(data);
        setLoading(false);
        console.log(data);
    }
    catch(err){
        alert("Failed to load the search results!!");
        console.log("err", err);
    }

  }

  const handleSubmit = async () => {
    if(!groupChatName || !selectedUser){
        alert("Please fill all the fields!!");
        return;
    }

    try{
        const config = {
            headers: {
                authorization : `Bearer ${getCookies("jwt")}`,
            },
        }

        const {data} = await axios.post("http://127.0.0.1:5001/api/v1/chats/group", {
            name : groupChatName,
            users : JSON.stringify(selectedUser.map((u) => u._id)),
        }, config);

        setChats([data, ...chats]);
        handleClose();
        alert(`Congratulationss, your "${groupChatName}" has been created successfully!!`);

   }
    catch(err){
        alert("Error Creating the Group!!");
        console.log("Error", err);
    }

  }

  const handleGroup = (userToAdd) => {
     if(selectedUser.includes(userToAdd)){
        alert("User already added!!");
        return;
     }
     
     setSelectedUser([...selectedUser, userToAdd]);
  };

  const handleDelete = (userToDelete) => {
     setSelectedUser(
            selectedUser.filter((sel) => sel._id != userToDelete._id)
     );
  } 


  return (
    <div>
      <span onClick={handleShow}>
        {children}
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                placeholder="Room name"
                autoFocus
                onChange = {(e) => setGroupChatName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Users</Form.Label>
              <Form.Control
                placeholder="Add Users e.g Shreya, Nitya, Chiku"
                autoFocus
                onChange = {(e) => handleSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className = "d-flex flex-row bd-highlight mb-3">
          {selectedUser.map((user) => (
            <UserBadgeItem 
            key = {user._id}
            user = {user}
            handleFunction = {() => handleDelete(user)}
            />
          ))}
          </div>

          {loading? (loading) : searchResult?.slice(0,4).map((user) => (
            <UserListItem key = {user._id} user = {user} handleFunction ={() => handleGroup(user)}/>
          ))}

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GroupChatModel
