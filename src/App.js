import './App.css';
import Button from './components/Button';
import React, { useState, useEffect } from "react";
import { fontFamily } from "./fontFamilies.js";


function App() {

  const [color, setColor] = useState({ r: 100, g: 150, b: 200 });
  const [font, setFont] = useState(fontFamily[0]);
  const [speed, setSpeed] = useState(0);

  function generateColor() {
    let updateData = { ...color };
    for (let key in updateData) {
      updateData[key] = (Math.floor(Math.random() * 256));
    }
    setColor(updateData);
  }

  function generateFont(fonts) {
    let randomElement = Math.floor(Math.random() * fonts.length);
    setFont(fonts[randomElement]);
  }

  function handleChange() {
    generateColor();
    generateFont(fontFamily);
  }

  function handleScale(e) {
    setSpeed(e.target.value);
    handleChange();
  }

  useEffect(() => {
    let intervalId;
    let formula = speed
    if (speed > 0) {
      intervalId = setInterval(() => {
        handleChange();
      }, 1000 / speed)
    }

    return () => clearInterval(intervalId);
  }, [speed])

  return (
    <div className="mainContainer">
      <div className="container"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
        }}
      >
        <h1 style={{
          fontFamily: `${font}`
        }}>Good Morning!
        </h1>
      </div>
      <Button handleChange={handleChange} />
      <div className='scaleContainer'>
        <label>
          Speed
      </label>
        <input
          className='scaleInput'
          type='range'
          min='0'
          max='10'
          value={speed}
          onChange={handleScale}
        />
        <label>{speed}x</label>
      </div>

    </div>

  )
}

export default App;
