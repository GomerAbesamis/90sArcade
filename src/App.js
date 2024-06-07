import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [gumballCount, setGumballCount] = useState(90);
  const [gumballArray, setGumballArray] = useState([]);
  const [walletValue, setWalletValue] = useState(10.00);
  const [coinBoxValue, setCoinBoxValue] = useState(50.00);

  const handleBuy = useCallback(() => {
    console.log('Buy!');

    if (gumballCount > 0) {
      setGumballCount(gumballCount-1);
      setWalletValue(walletValue-0.25);
      setCoinBoxValue(coinBoxValue+0.25);
    } else {
      alert('Out of gumballs!');
    }
  }, [coinBoxValue, gumballCount, walletValue]);

  const handleEmpty = useCallback(() => {
    console.log('Empty!');

    setWalletValue(walletValue+coinBoxValue);
    setCoinBoxValue(0);
  }, [coinBoxValue, walletValue]);

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
  
  return (
    <div className='App'>
      <script src='./gumball.js' type='text/javascript' charset='utf-8' async defer></script>
      <div className='main'>
        <div className='mainContainer'>
          <div className='header'>
            <div className='walletContainer'>
              <div className='walletText'>
                Wallet: ${parseFloat(walletValue).toFixed(2)}
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
            Coin Box: ${parseFloat(coinBoxValue).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
