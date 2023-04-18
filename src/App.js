import React, { useState } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState([]);
  const [popedPoints, setPopedPoints] = useState([]);
  console.log(popedPoints);
  const handlePlaceCircle = (e) => {
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  };

  const handleUndo = () => {
    const newPoints = [...points];
    const popedPoint = newPoints.pop();
    if (!popedPoint) return;
    setPopedPoints([...popedPoints, popedPoint]);
    setPoints(newPoints);
  };

  const handleRedo = () => {
    const newPopedPoints = [...popedPoints];
    const popedPoint = newPopedPoints.pop();
    if (!popedPoint) return;
    setPoints([...points, popedPoint]);
    setPopedPoints(newPopedPoints);
  };

  const Circle = ({ point, index }) => {
    return (
      <div
        className="circle"
        style={{ left: point.x + "px", top: point.y + "px" }}
        key={`circle${index}`}
      ></div>
    );
  };
  return (
    <>
      <button disabled={points.length === 0} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={popedPoints.length === 0} onClick={handleRedo}>
        Redo
      </button>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, index) => {
          return <Circle point={point} index={index} />;
        })}
      </div>
    </>
  );
}

export default App;
