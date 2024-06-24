import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [points, setPoints] = useState([]);
  const [idx, setIdx] = useState(0);
  const updatePoints = (evt) => {
    if(evt.clientY<50)
      return;
    const x = evt.clientX;
    const y = evt.clientY;
    setPoints(prevP => [...prevP, {x, y}]); 
    setIdx(idx+1);
  }
  useEffect(() => {
    document.addEventListener('click', updatePoints);
    return () => {
      document.removeEventListener('click', updatePoints);
    }
  }, [points])

  return (
    <>
      <button onClick={() => {
        if(idx>0)
          setIdx(idx-1);
      }}> Undo </button>
      <button onClick={() => {
        if(idx<points.length)
          setIdx(idx+1);
      }}> Redo </button>
      {
        points.slice(0, idx).map((point) => {
          return <div style={{
            position: 'absolute',
            left: point?.x,
            top: point?.y,
            width: '5px',
            height: '5px',
            background: 'blue'
          }}></div>
        })
      }
    </>
  )
}

export default App