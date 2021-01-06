import { useState, useEffect } from 'react';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';
import './styles.css';

function App() {
  const interval$ = timer(1000);
  const [time, setTime] = useState({ sec: 0, min: 0, hr: 0 });
  const [status, setStatus] = useState(false);

  useEffect(() => {
    let interval = null;
    let upSec = time.sec,
      upMin = time.min,
      upHr = time.hr;
    interval = interval$.subscribe(() => {
      if (status) {
        upSec++;
        if (time.sec >= 59) {
          upMin++;
          upSec = 0;
        }
        if (time.min >= 59) {
          upHr++;
          upMin = 0;
        }
        setTime({ sec: upSec, min: upMin, hr: upHr });
      }
    });
    return () => interval.unsubscribe();
  }, [status, time]);

  const waitBtn = () => {
    let doubleTimer = timer(300);
    doubleTimer.pipe(first()).subscribe(() => {
      setStatus(false);
    });
  };
  const zeroFirst = (el) => {
    return el > 9 ? el : `0${el}`;
  };

  return (
    <div className="App">
      <div className="timer">
        <h1>
          <span>{zeroFirst(time.hr)}:</span>
          <span>{zeroFirst(time.min)}:</span>
          <span>{zeroFirst(time.sec)}</span>
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
                setTime({ sec: 0, min: 0, hr: 0 });
              }}
            >
              STOP
            </button>
            <button className="waitBt" onDoubleClick={waitBtn}>
              WAIT
            </button>
            <button
              className="resetBt"
              onClick={() => setTime({ sec: 0, min: 0, hr: 0 })}
            >
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
