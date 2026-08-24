import { useState } from 'react';
import EssayInput from "./components/EssayInput";
import Results from "./components/Results";
import Header from "./components/Header";
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <main>
      <Header/>
      <EssayInput setResult={setResult}/>
      <Results result={result}/>
    </main>
  );
}

export default App;
