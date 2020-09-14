import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sashimi from '../../images/sashimi.PNG';
import wasabi from '../../images/wasabi.PNG';
import salmonnigiri from '../../images/salmonnigiri.PNG';
import pudding from '../../images/pudding.PNG';
import Rules from '../Rules/Rules';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [modal, setModal] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"><img src={salmonnigiri}/><img src={wasabi}/>Sushi Go!<img src={sashimi}/><img src={pudding}/></h1>
        <form>
        <div><input className="joinInput" placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} /></div>
        <div><input className="joinInput mt-20" placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/game?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
        <div className="extraButtonsRow mt-20">
          <button className="button" onClick={(e) => {
            e.preventDefault();
            setModal('rules')
          }}>How to play</button>
        </div>
        </form>
      </div>
      {modal && <div className="modal">
        <button className="button closeModal" onClick={(e) => {
          e.preventDefault();
          setModal('');
        }}>X</button>
        {modal === 'rules' && <Rules />}
      </div>}
    </div>
  )   
}

export default Join;