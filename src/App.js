import './App.css';
import {  Route, Routes } from 'react-router-dom';
import LoginUser from './Components/LoginUser/LoginUser';
import Room from './Components/Rooms/Room';
import ChatRoom from './Components/Rooms/ChatRoom/ChatRoom';
import CreateUser from './Components/CreateUser/CreateUser';
import { useState } from 'react';



function App() {
  const [socket, setSocket] = useState()

  const getSocket=(socket)=>{
    setSocket(socket);
  }

  return (
    <Routes>
      <Route path='/' element={<LoginUser/>}/>
      <Route path='/signup' element={<CreateUser/>}/>
      <Route path='/rooms/' element={<Room getSocket={getSocket}/>}/>
      <Route path='/rooms/:user/:id' element={<ChatRoom socket={socket}/>}/>
    </Routes>
  );
}

export default App;
