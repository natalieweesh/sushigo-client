import React from 'react';

import './TextContainer.css';

const TextContainer = ({ users, game, finishedGame }) => {
  let currentRound, totalRounds, gameOver;
  if (game.length > 0) {
    totalRounds = game.length;
    if (game.find((g) => !g.submitted)) {
      currentRound = game.find((g) => !g.submitted).steps.length + 1
    }
  }
  return (
    <div className="textContainer">
      {
        users
          ? (
            <div>
              <p>{currentRound && totalRounds && `Round ${currentRound} of ${totalRounds}`}</p>
              <p>{game.length > 0 && finishedGame && "Game over"}</p>
              {game.length > 0 ? (finishedGame ? "Play again?" : "Submitted?") : "Players in the room:"}
              <div className="activeContainer">
                {users.map((user) => {
                  let card;
                  if (game.length) {
                    card = game.find((c) => c.currentTurnIndex == user.orderIndex)
                  }
                  return <div key={user.name} className="activeItem">
                    <div>{user.name}</div>
                    {((game.length === 0 && user.readyToPlay) || (finishedGame && user.readyToRestart)) && <div className="greenDot"></div>}
                  </div>
                })}
              </div>
            </div>
          )
          : null
      }
    </div>
  );
}


export default TextContainer;