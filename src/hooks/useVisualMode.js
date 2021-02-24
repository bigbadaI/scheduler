import {useState} from "react"


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    setHistory(prev => {
    let tempHistory = [...prev]
    if (replace === true) {
    tempHistory.pop()
    tempHistory.push(newMode)
    return tempHistory
    }
    tempHistory.push(newMode)
    return tempHistory

  })
}
  const back = function() {
    setHistory(prev => {
    const newHistory = [...prev];
    if (newHistory.length <= 1) return newHistory
    newHistory.pop();
    return newHistory
  })
  };
  const mode = history.slice(-1).toString()
  return {mode, transition, back}

}