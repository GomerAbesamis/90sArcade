import './App.css';
import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react';

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'WALLET_INCREMENT':
        return { walletValue: state.walletValue + 0.25, coinBoxValue: state.coinBoxValue };
      case 'WALLET_DECREMENT':
        return { walletValue: state.walletValue - 0.25, coinBoxValue: state.coinBoxValue };
      case 'COIN_BOX_INCREMENT':
        return { walletValue: state.walletValue, coinBoxValue: state.coinBoxValue + 0.25 };
      case 'COIN_BOX_DECREMENT':
        return { walletValue: state.walletValue, coinBoxValue: state.coinBoxValue - 0.25 };
      case 'COIN_BOX_EMPTY':
        return { walletValue: state.walletValue + state.coinBoxValue, coinBoxValue: 0.00 };
      default:
        return state;
    }
  };
  
  const [gumballCount, setGumballCount] = useState(90);
  const [gumballArray, setGumballArray] = useState([]);
  const [state, dispatch] = useReducer(reducer, { walletValue: 15.00, coinBoxValue: 40.00});

  const handleBuy = useCallback(() => {
    console.log('Buy!');

    if (gumballCount > 0 && state.walletValue > 0.00) {
      setGumballCount(gumballCount-1);
      dispatch({ type: 'WALLET_DECREMENT' });
      dispatch({ type: 'COIN_BOX_INCREMENT' });
    } else if (gumballCount === 0) {
      alert('Out of gumballs!');
    } else {
      alert('Out of money!');
    }
  }, [gumballCount, state.walletValue]);

  const handleEmpty = useCallback(() => {
    console.log('Empty!');

    dispatch({ type: 'COIN_BOX_EMPTY' });
  }, []);

  const handleRefill = useCallback(() => {
    console.log('Refill!');

    setGumballCount(90);
  }, []);

  useEffect(() => {
    console.log('Fix gumball array!');

    const gumballColors = [
      '#0078e1',
      '#d11c11',
      '#56317f',
      '#fee215',
      '#2a990f',
      '#ff99d2',
      '#ecf3fb',
      '#f99c01'
    ];

    const gumballArray = Array.from({ length: gumballCount }, (_, index) => ({
      color: gumballColors[Math.floor(Math.random() * 8)],
    }));

    setGumballArray(gumballArray);
  }, [gumballCount]);

  const remindGumballCount = (count) => {
    console.log('Gumball count reminder! ' + count);
    return count;
  };

  const memoizedValue = useMemo(() => {
    return remindGumballCount(gumballCount);
  }, [gumballCount]);
  
  return (
    <div className='App'>
      <script src='./gumball.js' type='text/javascript' charset='utf-8' async defer></script>
      <div className='main'>
        <div className='mainContainer'>
          <div className='header'>
            <div className='walletContainer'>
              <div className='walletText'>
                Wallet: ${parseFloat(state.walletValue).toFixed(2)}
              </div>
            </div>
          </div>
          <div className='footer'>
            <div className='buttonContainer'>
              <button className='gumballButton' onClick={handleBuy}>
                Buy Gumball
              </button>
              <button className='gumballButton' onClick={handleEmpty}>
                Empty Coin Box
              </button>
              <button className='gumballButton' onClick={handleRefill}>
                Refill Gumballs
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal'>
        <div className='modal-content'>
          <div className='gumballContainer'>
            <div className='gumballContainer2'>
              {
                gumballArray.map(obj => (
                  <span className='gumball' style={{backgroundColor: obj.color}}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className='modal'>
        <div className='modal-content'>
          <img className='gumballMachine' src={'./gumballMachine.png'} alt='Gumball Machine' />
        </div>
      </div>
      <div className='coinBoxModal'>
        <div className='coinBox'>
          <div className='coinBoxText'>
            Coin Box: ${parseFloat(state.coinBoxValue).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
