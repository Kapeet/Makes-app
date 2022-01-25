const Player = (props) => {
    let buttonsDiv = (
        <div>
            <button onClick={() => props.onDiceRolled(props.name)}>Roll the dice</button>
            <button onClick={() => props.onDiceSaved(props.name)}>Hold</button>
        </div>
    );
    return (
        <div>
          <h1>{props.name}</h1>
          <p>Current Roll: {props.currentRoll}</p>
          <p>Total: {props.totalRoll}</p>
          {props.name !== "A.I." && buttonsDiv}
        </div>
    )
};

export default Player;