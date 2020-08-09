import React from 'react';
import Test from './components/Test';


function App(): React.ReactNode {

  let myNumber = 9;
  let myString = "dfs"

  return (
    <div className="App">
      <h1 className="text-4xl">test</h1>
      <Test number={myNumber} text={myString}/>
    </div>
  );
}

export default App;
