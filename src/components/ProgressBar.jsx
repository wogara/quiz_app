import {useEffect, useState} from 'react';

export default function ProgressBar({timer, answerState}){
    const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(()=>{
    if (answerState === ''){

    
    const interval=setInterval(()=>{
      setRemainingTime(prevTime => prevTime - 100);
    },100);
    return () => {
      clearInterval(interval);
    }
}
  })

  return (
    <progress id="question-time" value={remainingTime} max={timer}/>
  )

}