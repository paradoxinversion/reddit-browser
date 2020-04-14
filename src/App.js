import React, { useState } from "react";
import "./style.css";
const cid = "tUy5c7rH8_03OQ";

function App() {
  const [initCode, setInitCode] = useState("jedaiReturnTest");
  const goToOAuth = () => {
    window.location.href = ` https://www.reddit.com/api/v1/authorize?client_id=${cid}&response_type=code&state=${initCode}&redirect_uri=http://localhost:3000&duration=temporary&scope=read`;
  };
  return (
    <div className="App">
      <header>
        <p className="text-red-700">Not-Reddit</p>
      </header>
      <div>
        <p>Post area</p>
        <p onClick={() => goToOAuth()}>Auth</p>
      </div>
    </div>
  );
}

export default App;
