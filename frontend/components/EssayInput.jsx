//usestate is like the memory of react because everytime smth changes, react will rerun func
import { useState } from "react";

function EssayInput({ setResult }){
    //this is how text is stored (in a state variable)
    //text is the variable that holds curr value and setText is the thing that updates it
    //for essayinput, you need store text bc changes as user types
    const [text, setText] = useState("");

    const analyzeEssay = async () => {
        //you don't get actual data yet you get response object, 
        const res = await fetch("http://127.0.0.1:8000/analyze", {
            method: "POST",
            //tells what kind of data is it (im sending json)
            headers: { "Content-Type" : "application/json"},
            //since you can't send js obj directly, you convert it to json string
            body: JSON.stringify({ text }),
        });

        //this converts the res object to actual data so then you just do like data = wtv.
        const data = await res.json();
        setResult(data);
    };

    return (
        <div>
            {/* the (e) reps an event object that contains e.target (html element that triggered event) and e.target.value which is whats inside the element*/}
            {/* so if i press "a", browser creates object with target: <textarea> and target.value: "A" and 
            React calls setText("A"), stores "A", reruns component and now value = {text} = A */}
            <textarea rows = "8" value = {text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={analyzeEssay}> Analyze Essay </button>
        </div>
    );
}

export default EssayInput;