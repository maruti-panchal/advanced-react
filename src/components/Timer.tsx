import { useEffect, useRef, useState } from 'react';
import { Timer as TimerProps, useTimersContext} from './store/timers-context.tsx';
import Container from './UI/Container.tsx';

export default function Timer({name,duration}:TimerProps) {
  const [remainingTime,setRemainingTime]=useState(duration*1000);
  const interval=useRef<number|null>(null);
  const {isRunning}=useTimersContext();

  if(remainingTime<=0 && interval.current){
    clearInterval(interval.current);
  }

  useEffect(()=>{
    let timer:number;

    if(isRunning){
      timer=setInterval(()=>{
        setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          return prevTime;
        }
        return prevTime - 50;
      });
    },50)
    interval.current=timer;
    }else if(interval.current){
      clearInterval(interval.current);
    } 
    return()=>{
        clearInterval(timer);
    }

  },[isRunning]);

  const formattedReamainingTime=(remainingTime/1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration*1000} value={remainingTime}/>
      </p>
      <p>{formattedReamainingTime}s</p>
    </Container>
  );
}