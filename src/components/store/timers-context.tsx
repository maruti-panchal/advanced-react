import { createContext, useContext, useReducer } from "react";

export type Timer={
    name:string;
    duration:number;
}

type TimersState={
    isRunning:boolean;
    timers:Timer[];
}

const initialState:TimersState={
    isRunning:false,
    timers:[]
}

type TimersContextvalue=TimersState & {
    addTimer:(timer:Timer)=>void;
    startTimer:()=>void;
    stopTimer:()=>void;
}

// type Action={
//     type:"ADD_TIMER" | "START_TIMER" | "STOP_TIMER";
//     payload?:Timer;
// }

type StartTimersAction={
    type:"START_TIMER";
}

type StopTimersAction={
    type:"STOP_TIMER";
}

type AddTimerAction={
    type:"ADD_TIMER";
    payload:Timer;
}

type Action= StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state:TimersState,action:Action):TimersState{
    switch(action.type){
        case "ADD_TIMER":
            if(action.payload){
                return {
                    ...state,
                    timers:[...state.timers,{
                        name:action.payload.name,
                        duration:action.payload.duration
                    }]
                }
            }
            return state;
        case "START_TIMER":
            return {
                ...state,
                isRunning:true
            };
        case "STOP_TIMER":
            return {    
                ...state,
                isRunning:false
            };
        default:
            return state;
    }
}

const TimersContext= createContext<TimersContextvalue | null>(null);

export function useTimersContext(){
    const timerCtx=useContext(TimersContext);

    if(!timerCtx){
        throw new Error("useTimersContext must be used within a TimersContextProvider");
    }
    return timerCtx;
}

type TimersContextProviderProps={
    children:React.ReactNode;
}

export default function TimersContextProvider({children}:TimersContextProviderProps){

    const [timersState,dispatch]=useReducer(timersReducer,initialState);


    const ctx:TimersContextvalue={

        isRunning:timersState.isRunning,
        timers:timersState.timers,

        addTimer(timer:Timer){
            dispatch({type:"ADD_TIMER",payload:timer});
        },

        startTimer(){
            dispatch({type:"START_TIMER"});
        },  

        stopTimer(){
            dispatch({type:"STOP_TIMER"});
        }           
    }


    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    );
}

