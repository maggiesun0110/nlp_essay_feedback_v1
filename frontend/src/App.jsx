import { useState } from 'react';
import EssayInput from "../components/EssayInput";
import Results from "../components/Results";

function App(){
  //prop for Results component since children cannot update parent state
  //app passes the setresult to essayinput for it to update and returns the result to app
  //so app can pass the result down to results for it to display
  const [result, setResult] = useState(null);

  return (
    <div>
      <EssayInput setResult = {setResult}/>
      <Results result = {result}/>
    </div>
  );
}

export default App;