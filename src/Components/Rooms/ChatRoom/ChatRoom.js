import React, { useEffect, useState } from 'react'

import AllMessage from './AllMessage';
import SendMessage from './SendMessage';
import { ChatApi } from '../../../Context/Chat_API'

import './chatRoom.css'
import { useParams } from 'react-router-dom';

// const currentUrl = window.location.pathname;
// const usus = currentUrl.split("/")[2];

// console.log(usus)



function ChatRoom(props) {
  const { id } = useParams();

  const [userName, setUserName] = useState();
  const [availableUSers, setAvailableUSers] = useState([]);

  window.history.pushState({ page: 'current' }, '',`http://192.168.29.126:3001/rooms` );
  window.addEventListener('popstate', function (event) {
    // props.socket.emit('leave room', userName, availableUSers);
    window.history.pushState({ page: 'current' }, '', `http://192.168.29.126:3001/rooms`);
  });

  const enterRoom = async () => {
    try {
      const response = await fetch(`${ChatApi}/rooms/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': document.cookie
        }
      });
      const data = await response.json();
      setUserName(data.userName)
      props.socket.emit('join room', data.userName, id);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    enterRoom();
  }, []);

  useEffect(() => {
    props.socket.on('join room', (data) => {
      document.getElementById('newEntry').textContent = data.msg;
      setAvailableUSers(data.users);
      window.scrollTo(0, document.body.scrollHeight);
    });
    return () => {
      props.socket.off('join room');
    };

  }, []);

  useEffect(() => {
    props.socket.on('leave room', (user, users) => {
      document.getElementById('newEntry').textContent = `${user} left the room`;
      setAvailableUSers(users)
    });
    return () => {
      props.socket.off('leave room');
    };

  }, []);

  useEffect(()=>{
    props.socket.on('disconnected',(user,msg)=>{
      document.getElementById('newEntry').textContent = msg;
      let updateUsers =availableUSers.filter(curr=>curr !== user);
      setAvailableUSers(updateUsers);
    })
    return () => {
      props.socket.off('disconnected');
    };
  },[])

  const leaveChatHandler = (e) => {
    props.socket.emit('leave room', userName, availableUSers);
    window.history.back();
  }

  // window.addEventListener('popstate', function (event) {
  //   props.socket.emit('leave room', userName, availableUSers);
  // });

  const showUsersHandler = () => {
    document.getElementById('usersContainer').style.display="flex"
  }
  const hideUsersList = () => {
    document.getElementById('usersContainer').style.display="none"
  }



  // console.log(availableUSers)
  return (
    <div className='chatRoom'>
      <div className='ChatRoomHead'>
        <button className='leaveChatBtn' onClick={leaveChatHandler} style={{ color: 'red', backgroundColor: '#000' }}>Leave</button>
        <div className='roomHeaderItems' >
          <p >Online : <span style={{ color: '#0f0' }}>{availableUSers.length}</span></p>
          <button onClick={showUsersHandler}>All Users</button>
        </div>
      </div>
      {/* <div className='usersContainer' id='usersContainer'> */}
        <ol className='usersList' id='usersContainer'>
          <button onClick={hideUsersList}><i className="fa-solid fa-xmark"></i></button>
          <h1 style={{ margin: '1.5rem 0' }}>Active Users</h1>
          {availableUSers.map((curr, i) => {
            return <li key={i}><span>{i + 1}.</span>&nbsp;{curr} </li>
          })}
        </ol>
      {/* </div> */}
      <AllMessage userName={userName} socket={props.socket}/>
      <SendMessage userName={userName} socket={props.socket}/>
    </div>
  )

}


export default ChatRoom