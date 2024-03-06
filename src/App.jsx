// App.jsx
import React, { useState } from "react";
import Scene from "./components/Scene";
import Controller from "./components/Controller";

function App() {
  const [input, setInput] = useState(null);
  const [stop, setStop] = useState(true);

  return (
    <>
      <Scene input={input} stop={stop} />
      <Controller setInput={setInput} setStop={setStop} />
    </>
  );
}

export default App;
