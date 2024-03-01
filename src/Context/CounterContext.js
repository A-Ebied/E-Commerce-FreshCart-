import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {

  let [counter, setCounter] = useState(0);

  function chanegCounter()
   {
    setCounter(Math.random());
   }
  return (
    <CounterContext.Provider value={{ counter, chanegCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
