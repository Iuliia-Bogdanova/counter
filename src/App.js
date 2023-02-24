import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  const onClickPlus = () => {
    setCount(count + 1);    
  };

  const onClickMinus = () => {
    setCount(count - 1);
  };

  return (
    <div className="App">
      <h2>Counter</h2>
      <h1>{count}</h1>
      <div className="btn">
        <button onClick={onClickMinus}  className="minus">
          Minus -
        </button>
        <button onClick={onClickPlus} className="plus">
          + Plus
        </button>
      </div>
    </div>
  );
}

export default App;
