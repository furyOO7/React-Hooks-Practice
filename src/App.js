
import React, { useState, useEffect } from 'react';
import Racemenu from './raceMenu';

const App = () => {
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null, typing: false, typetimer: null };
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [SNIPPETS_prop] = useState(SNIPPETS);

  const updateUserText = event => {
    setUserText(event.target.value);
    if(gameState.typetimer){
      clearTimeout(gameState.chooseSnippet)
    }
   
    setGameState({...gameState, typing: true})
    gameState.typetimer = setTimeout(()=>{
      setGameState({...gameState, typing: false})
    },2000)
    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
      setTimeout(() => {
        setGameState(INITIAL_GAME_STATE)

      },3000)
    }
  }

  const chooseSnippet = snippetIndex => () => {
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  };

  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
    if(gameState.typing) document.title = 'Typing!';
    else {
      if(!gameState.startTime)
      document.title = 'Begin!';
      else
      document.title = 'Idle!';
    }
  });

  return (
    <div>
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4> 
      {gameState.startTime ?  <input value={userText} onChange={updateUserText} /> : null}
      
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }
      <hr />
      
      <Racemenu snippetdata= {SNIPPETS_prop}/>
      {
        gameState.victory ? <img src="https://media.giphy.com/media/YTbZzCkRQCEJa/giphy.gif"/> : null
      }
    </div>
  );
}

export default App;