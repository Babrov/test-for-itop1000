import { useState, useEffect } from 'react';
import './styles.css';
function App() {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    let interval = null;
    if (status) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [status]);
  return (
    <div className="App">
      <div className="timer">
        <h1>
          <span>{('0' + Math.floor(time / 3600000)).slice(-2)}:</span>
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{('0' + ((time / 1000) % 60)).slice(-2)}</span>
        </h1>
      </div>
      <div>
        {!status ? (
          <button className="startBt" onClick={() => setStatus(true)}>
            START
          </button>
        ) : (
          <>
            <button
              className="stopBt"
              onClick={() => {
                setStatus(false);
                setTime(0);
              }}
            >
              STOP
            </button>
            <button className="waitBt" onDoubleClick={() => setStatus(false)}>
              WAIT
            </button>
            <button className="resetBt" onClick={() => setTime(0)}>
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
