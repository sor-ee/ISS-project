import React, { useState, useRef} from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import {signOut} from 'firebase/auth';
import { auth } from './firebase-config'; 
const cookies = new Cookies()
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null)

  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  };
  if(!isAuth) {
    return (
    <div><Auth setIsAuth={setIsAuth}/></div>
    );
  }
  

  return (
    <div className='pt-5'>
      <div className='pt-5'></div>
      <div className='container-md bg-white p-5 rounded-3 fs-5'>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className='room text-center'>
          <div className=''>
            <label>Enter Room Name :</label>
            <input className='ms-3 col-8 p-2' ref={roomInputRef}/>
          </div>
          <div className='row mt-5'>
            <div className='sign-out col text-end'>
              <button className='bgClass1 border-0 p-2 ps-4 pe-4 rounded-3 col-4' onClick={signUserOut}>Sign Out</button>
            </div>
            <div className='col text-start'>
              <button className='bgClass border-0 p-2 ps-4 pe-4 rounded-3 col-4' onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
            </div>
          </div>
        </div>
      )} 
      {room ? (
        <div className='sign-out col text-end'>
          <button className='bgClass1 border-0 p-2 ps-4 pe-4 rounded-3 col-4' onClick={signUserOut}>Sign Out</button>
        </div>
      ) : (
        <></>
      )}
      
      </div>
    </div>
  );
}

export default App;
