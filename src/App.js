import logo from './logo.svg';
import './App.css';
import Player from './components/Player'
import { useEffect, useLayoutEffect, useState } from 'react';
function App() {
  const [pointLimit, setPointLimit] = useState(100);
  const [dice, setDice] = useState({
    player1currentRoll: 0,
    player2currentRoll: 0,
    player1Total: 0,
    player2Total: 0,
  });
  const [isGameOver, setGamerOver] = useState(false);
  const [isAIactive, setAIactive] = useState(false);
  const onDiceRolled = (player) => {
    if (player === 'Player 1')
    {
      setDice({
        ...dice,
        player1currentRoll: Math.ceil(Math.random() * 12)
      });
    }
    else if (player === 'Player 2')
    {

      setDice({
        ...dice,
        player2currentRoll: Math.ceil(Math.random() * 12)
      });
    }
  }

  const playAImoves = () => {
    let tries = Math.ceil(Math.random() * 3)
    let i, newState;
    for (i = 1; i <= tries; i++) 
    {
      newState = {
        ...dice, 
        // player1Total: dice.player1Total,
        // player1currentRoll: 0,
        player2currentRoll: Math.ceil(Math.random() * 12)
      };
      setTimeout(() => setDice(newState),1 * 1000);
    }
    setTimeout(() => setDice({...dice, player2Total: dice.player2Total + newState.player2currentRoll}), 2 * 1000);
  };

  const onDiceSaved = (player) => {
    let currentRoll;
    if (player === 'Player 1')
    {
      currentRoll = dice.player1currentRoll;
      setDice({
        ...dice,
        player1currentRoll: 0,
        player1Total:  dice.player1Total + currentRoll
      }, isAIactive ? playAImoves() : '');
    }
    else if (player === 'Player 2')
    {
      currentRoll = dice.player2currentRoll;
      setDice({
        ...dice,
        player2currentRoll: 0,
        player2Total: dice.player2Total + currentRoll
      });
    }
  }

  useEffect(() => {
    if (dice.player1Total >= pointLimit && dice.player2Total >= pointLimit)
    {
      setGamerOver(true);
    }
  }, [dice.player1Total, dice.player2Total])

  useEffect(() => {
    if (dice.player1currentRoll === 12)
    {
      setTimeout(alert,1000,'Player 1 rolled 6 and 6!');  
    }
    else if (dice.player2currentRoll === 12)
    {
      if (isAIactive)
      {
        setTimeout(alert,1000,'A.I. rolled 6 and 6!');  
      }
      else
      {

        setTimeout(alert,1000,'Player 2 rolled 6 and 6!');  
      }
    }
  }, [dice.player1currentRoll, dice.player2currentRoll]);

  const checkWinner = () => {
    let player1Won = dice.player1Total - pointLimit < dice.player2Total - pointLimit
        return (
          <div>
            <h1>{player1Won ? "Player 1" : isAIactive ? "A.I." : "Player 2"} wins!</h1>
          </div>
        )
  }
  return (
    <div className="App">
      <header className="App-header">
        {isGameOver 
        ? checkWinner()
        :
          <div className="Game">
            <Player name="Player 1" currentRoll={dice.player1currentRoll} totalRoll={dice.player1Total} onDiceRolled={onDiceRolled} onDiceSaved={onDiceSaved}/>
            <Player name={isAIactive ? "A.I." : "Player 2"} currentRoll={dice.player2currentRoll} totalRoll={dice.player2Total} onDiceRolled={onDiceRolled} onDiceSaved={onDiceSaved} />
          </div>
        }
        {/* <button onClick={() => setAIactive(!isAIactive)}>Toggle AI player</button> */}
          <label>Change point limit: </label><input placeholder="enter point limit here" type="tel" value={pointLimit} onChange={(e) => setPointLimit(e.target.value)}/>  
   
      </header>
    </div>
  );
}

export default App;
