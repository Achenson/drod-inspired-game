import React from "react";
import MainUI from "./components/MainUI";

function App(): JSX.Element {
  let myNumber = 9;
  let myString = "dfs";

  return (
    <div className="App">
      <MainUI />
    </div>
  );
}

export default App;
