import React from "react";
import "./Controller.css";

function Controller({ setInput, setStop }) {
  const handleStart = () => {
    setStop(false);
  };
  const handleStop = () => {
    setStop(true);
  };
  const handleReset = () => {
    setInput(null);
  };
  return (
    <div className="controller">
      {/* <input onChange={(e) => setInput(e.target.value)} /> */}
      <button onClick={() => setInput("1")}>执行动作1</button>
      <button onClick={() => setInput("2")}>执行动作2</button>
      {/* <button onClick={handleStart}>开始</button>
    <button onClick={handleStop}>停止</button>
    <button onClick={handleReset}>重置</button> */}
    </div>
  );
}

export default Controller;
