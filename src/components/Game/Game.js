import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Draggable from 'draggable';
import { tiles } from './tiles';
import Rules from '../Rules/Rules';
import Cheatsheet from '../Cheatsheet/Cheatsheet';
import TextContainer from '../TextContainer/TextContainer';
import './Game.css';

let socket;

const Game = ({ location }) => {
  const [name, setName] = useState('');
  const myName = useRef('');
  const [room, setRoom] = useState('');
  const [prevmessages, setPrevMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const allUsers = useRef([]);
  const [currentGame, setCurrentGame] = useState([]);
  const [newRound, setNewRound] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);
  const [poop, setPoop] = useState(false);
  const [cards, setCards] = useState(tiles["tiles"]);
  const [allTiles, setAllTiles] = useState(tiles["tiles"]);
  const [piles, setPiles] = useState([]);
  const [hands, setHands] = useState([]);
  const draggables = useRef([]);
  const [modal, setModal] = useState('');

  // TODO: change this for prod / dev
  // const ENDPOINT = 'localhost:5000';
  const ENDPOINT = 'https://sushi-go-app.herokuapp.com/';


  const setTileClass = (x, y, user, tile, animate) => {
    let className;
    let tileId = tile.element.id;
    if (x > 850) {
      className = 'item inHand';
    } else {
      className = 'item inPile';
    }
    
    if (animate) {
      let oldClassName = className;
      document.getElementById(tileId).className = className + ' flash';
      const animation = setTimeout(() => {
        document.getElementById(tileId).className = oldClassName;
        clearTimeout(animation);
      }, 750)
    } else {
      document.getElementById(tileId).className = className;
    }
  }

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name.trim().toLowerCase());
    myName.current = name.trim().toLowerCase();
    setRoom(room.trim().toLowerCase());

    socket.emit('join', { name, room }, ((e) => {
      if (e) {
        window.location.href='/';
        alert(e)
      }
    }));

    return () => {
      socket.emit('disconnect');

      socket.off();
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.off('roomData').on('roomData', ({ users }) => {
      setUsers(users);
      allUsers.current = users;
    })
    socket.off('gameStatus').on('gameStatus', ({ game }) => {
      if (game && game.cards.length > 0) {
        setCards(game.cards);
        setPiles(game.piles);
        const user = allUsers.current.find((user) => user.name === myName.current);
        if (game.hands) {
          // console.log('user pile', game.piles[(user.orderIndex + game.currentRound) % game.userCount])
          var allTiles = document.getElementsByClassName('item');
          for (let i=0; i < allTiles.length; i++) {
            allTiles[i].className = 'item hidden';
          }
          game.piles[(user.orderIndex + game.currentRound) % game.userCount].map((c) => {
            if (c && document.getElementById(c['id'])) {
              if (user.answerSubmitted) {
                document.getElementById(c['id']).className = 'item hidden';
              } else {
                document.getElementById(c['id']).className = 'item inPile';
                let tile = draggables.current.find((d) => d.element.id === c.id);
                if (c && c['x'] && c['y']) {
                  tile.set(c['x'], c['y']);
                } else {
                  const randPileX = 370 + Math.floor(Math.random() * 350);
                  const randPileY = 130 + (user.orderIndex * 365) + Math.floor(Math.random() * 280);
                  if (tile) {
                    tile.set(randPileX, randPileY);
                    socket.emit('moveTile', {el: c['id'], x: randPileX, y: randPileY, settingUp: true}, () => {});
                  }
                }
              }
            }
          })

          game.hands.map((hand, handIdx) => {
            let cards;
            if (handIdx === user.orderIndex || game.finishedGame) {
              cards = hand;
            } else {
              cards = hand.slice(0, game.currentRound);
            }
            cards.map((c) => {
              if (document.getElementById(c['id'])) {
                document.getElementById(c['id']).className = 'item inHand';
              }
              // move to previous location if location is already set
              if (c['x'] && c['y']) {
                let tile = draggables.current.find((d) => d.element.id === c.id);
                tile.set(c['x'], c['y']);
              }
            })
          })

        }
      }

      if (currentGame.length === 0 && !!game) {
        setCurrentGame(game);
        if (newRound !== game.newRound) {
          setNewRound(game.newRound)
        }
        setFinishedGame(game.finishedGame)
      }
    })
    socket.off('gameRestarted').on('gameRestarted', ({ users }) => {
      draggables.current = [];
      setCards(tiles["tiles"])
      document.querySelectorAll('.item').forEach((el) => {
        draggables.current.push(new Draggable(el, {onDragEnd: (el, x, y, event) => {
          socket.emit('moveTile', {el: el.id, x, y, settingUp: false}, () => {})
        }}));
      })
      setFinishedGame(false)
      setNewRound(false)
      setUsers(users);
      allUsers.current = users;
      setCurrentGame([])
      draggables.current.forEach((d) => {
        const randX = 360 + Math.floor(Math.random() * 980);
        const randY = 480 + Math.floor(Math.random() * 680);
        d.set(randX, randY);
      })
    })
    socket.off('tileMoved').on('tileMoved', ({el, x, y, user, settingUp}) => {
      if (user.name !== myName.current || settingUp) {
        // console.log('tile was moved by someone else or setting up!')
        return;
      }
      const tile = draggables.current.filter((e) => e.element.id === el)[0];
      if (document.getElementById(el) && (document.getElementById(el).className.includes('hidden') || document.getElementById(el).className.includes('inPile'))) {
        return
      }
      setTileClass(x, y, user, tile, true);
      tile.set(x, y);
    })

    document.querySelectorAll('.item').forEach((el) => {
      draggables.current.push(new Draggable(el, {onDragEnd: (el, x, y, event) => {
        socket.emit('moveTile', {el: el.id, x, y, settingUp: false}, () => {
          // console.log('tile moved on Drag End!', el.id, x, y);
        })
      }}));
    })
    // scatter the tiles!
    draggables.current.forEach((d) => {
      const randX = 360 + Math.floor(Math.random() * 800);
      const randY = 120 + Math.floor(Math.random() * (1080));
      d.set(randX, randY);
    })
  }, [])

  useEffect(() => {
    socket.off('disconnect').on('disconnect', () => {
      // if(!alert('ack! you have been disconnected!')){window.location.reload();}
      // if(!alert('ack youve been disconnected')){setPoop(true)}
      setPoop(true);
      const reconnectFrontEnd = () => {
        const { name, room } = queryString.parse(location.search);
        socket.connect()
        socket.emit('frontEndReconnect', {name, room}, () => {
        })
        socket.emit('join', { name, room }, ((e) => {
          if (e) {
            window.location.href='/';
            alert(e)
          }
        }));
        document.removeEventListener('click', reconnectFrontEnd)
        document.removeEventListener('visibilitychange', reconnectFrontEndVisible);
      }
      document.addEventListener('click', reconnectFrontEnd)

      const reconnectFrontEndVisible = () => {
        const { name, room } = queryString.parse(location.search);
        if (document.visibilityState && document.visibilityState === 'visible') {
          socket.connect()
          socket.emit('frontEndReconnect', {name, room}, () => {
          })
          socket.emit('join', { name, room }, ((e) => {
            if (e) {
              window.location.href='/';
              alert(e)
            }
            document.removeEventListener('visibilitychange', reconnectFrontEndVisible);
          })); 
          document.removeEventListener('visibilitychange', reconnectFrontEndVisible);
          document.removeEventListener('click', reconnectFrontEnd)
        }
      }
      document.addEventListener('visibilitychange', reconnectFrontEndVisible)
    })
  })

  useEffect(() => {
    socket.off('message').on('message', ({user, message, messages}) => {
      if (message && prevmessages) {
        setPrevMessages([...prevmessages, {user, text: message}]);
      } else if (message && messages) {
        setPrevMessages([...messages, {user, text: message}]);
      }
    })
  }, [prevmessages])

  useEffect(() => {
    socket.off('startGame').on('startGame', ({ users }) => {
      socket.emit('initiateGame', {cards: tiles["tiles"]}, () => {
        socket.emit('fetchGame', () => {})
      })
    })
  }, [currentGame, setCurrentGame])

  const submitTurn = () => {
    let cardsInHand = [];
    let cardsInPile = [];
    let inHand = document.getElementsByClassName('inHand');
    for (let i=0; i < inHand.length; i++) {
      let c = inHand[i];
      if (c.offsetLeft >= 850 && c.offsetTop >= 120 + (user.orderIndex * 371) && c.offsetTop < 120 + ((user.orderIndex + 1) * 371)) {
        cardsInHand.push({id: c.id, img: c.dataset['img'], type: c.dataset['type'], x: c.offsetLeft, y: c.offsetTop});
        socket.emit('moveTile', {el: c.id, x: c.offsetLeft, y: c.offsetTop}, () => {});
      } else if (c.offsetLeft < 850 && c.offsetTop >= 120 + (user.orderIndex * 371) && c.offsetTop < 120 + ((user.orderIndex + 1) * 371)) {
        cardsInPile.push({id: c.id, img: c.dataset['img'], type: c.dataset['type']});
      }
    }
    let inPile = document.getElementsByClassName('inPile');
    for (let j=0; j < inPile.length; j++) {
      let c = inPile[j];
      if (c.offsetLeft < 850 && c.offsetTop >= 120 + (user.orderIndex * 371) && c.offsetTop < 120 + ((user.orderIndex + 1) * 371)) {
        cardsInPile.push({id: c.id, img: c.dataset['img'], type: c.dataset['type']});
      } else if (c.offsetLeft >= 850 && c.offsetTop >= 120 + (user.orderIndex * 371) && c.offsetTop < 120 + ((user.orderIndex + 1) * 371)) {
        cardsInHand.push({id: c.id, img: c.dataset['img'], type: c.dataset['type'], x: c.offsetLeft, y: c.offsetTop});
        socket.emit('moveTile', {el: c.id, x: c.offsetLeft, y: c.offsetTop}, () => {});
      }
    }
    socket.emit('submitTurn', {cardsInHand: cardsInHand, cardsInPile: cardsInPile}, () => {
      const user = allUsers.current.find((user) => user.name === myName.current);
      if (user.answerSubmitted) {
        // now hide the pile since you submitted already
        let newHandTiles = document.getElementsByClassName('inHand')
        let allTiles = document.getElementsByClassName('item');
        for (let k=0; k < allTiles.length; k++) {
          if (!allTiles[k].className.includes('inHand')) {
            allTiles[k].className = 'item hidden';
          }
        }
        for (let l=0; l < newHandTiles.length; l++) {
          newHandTiles[l].className = 'item inHand';
        }

      }
    })
  }

  const updateUserStatus = (event) => {
    event.preventDefault();

    socket.emit('setReadyToPlay', () => {
    })
  }

  const userRestart = (event) => {
    event.preventDefault();

    socket.emit('setReadyToRestart', {cards: currentGame.gameNumber === 3 ? (tiles["tiles"]) : (currentGame.leftoverCards || tiles["tiles"]), newGameOf3: currentGame.gameNumber === 3}, () => {})
  }

  const user = users.find((user) => user.name === myName.current);
  return (
    <div className={`player-${user?.orderIndex} outerContainer ${currentGame.finishedGame && 'revealAll'}`}>
      <div className="rightTopSquare instructions">
      {
        currentGame && currentGame.scores && currentGame.puddingCounts && <>
          <p className="bold">🤗 Scoreboard! 🤗</p>
          {currentGame.scores.map((score, i) => {
            return <div><label>{users[i]['name']}: &nbsp;</label><input onChange={(e) => {
              socket.emit('updateScore', {userId: i, score: e.target.value}, () => {})
            }} type="number" value={score}/></div>
          })}
          <p className="bold">🍮 Pudding Tracker! 🍮</p>
          {currentGame.puddingCounts.map((puddingCount, i) => {
            return <div><label>{users[i]['name']}: &nbsp;</label><input onChange={(e) => {
              socket.emit('updatePuddingCount', {userId: i, puddingCount: e.target.value}, () => {})
            }} type="number" value={puddingCount}/></div>
          })}
          <br/><br/>
          <p className="bold">💸 Scoring Quick Guide: 💸</p>
          <p><strong>🍙 Maki Rolls:</strong><br/>Most: 6 points<br/>Second most: 3 points</p>
          <p><strong>🍤 Tempura:</strong><br/>Set of 2: 5 points</p>
          <p><strong>🐟 Sashimi:</strong><br/>Set of 3: 10 points</p>
          <p><strong>🥟 Dumplings:</strong><br/>Set of 1: 1 point<br/>Set of 2: 3 points<br/>Set of 3: 6 points<br/>Set of 4: 10 points<br/>Set of 5+: 15 points</p>
          <p><strong>🍣 Nigiri:</strong><br/>Squid: 3 points<br/>Salmon: 2 points<br/>Egg: 1 point<br/>With a wasabi: nigiri score x 3</p>
          <p><strong>🍮 Pudding:</strong><br/>at the end of 3 rounds:<br/>Most: 6 points<br/>Least: -6 points</p>
        </>
      }
      </div>
      <div className={"sideContainer player-"+user?.orderIndex}>
        {poop ? <div className="modal"><div className="attentionModal">Hey! Pay attention to the game!<button className="button" onClick={() => {setPoop(false)}}>Ok</button></div></div> : null}
        {(currentGame.length === 0 || finishedGame) && <TextContainer users={users} user={user} game={currentGame} finishedGame={finishedGame} />}
        {currentGame.length === 0 && users.length > 1 && <button className="startButton" disabled={user?.readyToPlay || user?.readyToRestart} onClick={updateUserStatus}>{(user?.readyToPlay || user?.readyToRestart) ? 'Waiting for other players' : 'Ready to play!'}</button>}
        {finishedGame && <div><button className="startButton" disabled={user?.readyToRestart} onClick={userRestart}>{user?.readyToRestart ? 'Waiting for other players' : 'Play again!'}</button></div>}

        {currentGame.length !== 0 && (
          <>
          {currentGame && <p>Game {currentGame.gameNumber} of 3</p>}
          {(user && !user.answerSubmitted) ? <button className="submitButton" onClick={submitTurn}>Finalize your turn!</button> : (currentGame?.finishedGame ? null : <p>Waiting for other players before flipping over your card...</p>)}
          {currentGame.finishedGame ? <p>Game over!</p> : <p>Round {currentGame.currentRound + 1} of {currentGame.handSize}</p>}
          </>
        )}
        <button className="rulesButton" onClick={() => setModal('rules')}>Check the rule book</button>
        <button className="cheatsheetButton" onClick={() => setModal('cheatsheet')}>Scoring Guide</button>
        {modal && <div className="modal">
          <button className="button closeModal" onClick={(e) => {
            e.preventDefault();
            setModal('');
          }}>X</button>
          {modal === 'rules' ? <Rules /> : <Cheatsheet />}
          
        </div>}
      </div>
      <div className={currentGame?.finishedGame ? "mah-jong-board game-over" : "mah-jong-board"}>
      {currentGame && currentGame.finishedGame && <div className={"finishedContainer height-" + users.length}>
        {users.map((u, i) => {
          return <div className="finishedRow" key={'finished-row-' + i}>
            <p>{u.name}'s hand</p>
          </div>
        })}
        </div>
      }
      
      {cards.map((t) => <p className="item poop" id={t.id} data-img={t.img} data-type={t.type}><img src={t.img} alt={t.id}/>{t.id}</p>)}
      <div className="player-space player-0">
        {users.length > 0 && <p>Player one: {users[0].name}</p>}
        {user && users.length > 0 && user.orderIndex === 0 && <span>Draw from here! &nbsp; &nbsp; &nbsp; &nbsp; and move your cards to there 👉</span>}
      </div>
      <div className="player-space player-1">
        {users.length > 1 && <p>Player two: {users[1].name}</p>}
        {user && users.length > 1 && user.orderIndex === 1 && <span>Draw from here! &nbsp; &nbsp; &nbsp; &nbsp; and move your cards to there 👉</span>}
      </div>
      {users.length > 2 && <div className="player-space player-2">
         <p>Player three: {users[2].name}</p>
         {user && users.length > 2 && user.orderIndex === 2 && <span>Draw from here! &nbsp; &nbsp; &nbsp; &nbsp; and move your cards to there 👉</span>}
      </div>}
      {users.length > 3 && <div className="player-space player-3">
         <p>Player four: {users[3].name}</p>
         {user && users.length > 3 && user.orderIndex === 3 && <span>Draw from here! &nbsp; &nbsp; &nbsp; &nbsp; and move your cards to there 👉</span>}
      </div>}
      {users.length > 4 && <div className="player-space player-2">
         <p>Player five: {users[4].name}</p>
         {user && users.length > 4 && user.orderIndex === 4 && <span>Draw from here! &nbsp; &nbsp; &nbsp; &nbsp; and move your cards to there 👉</span>}
      </div>}
      </div>
    </div>
  )   
}

export default Game;