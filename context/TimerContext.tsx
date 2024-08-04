import { useState, createContext, Children, Dispatch, SetStateAction, ReactNode } from "react";

interface TimerContextProps {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextProps>({
    duration: 10,
    setDuration: ()=> {}
})

interface TimerProviderProps {
  children: ReactNode;
}

const TimeProvider = ({children}:TimerProviderProps) => {
    const [duration, setDuration] = useState(10)

    return(
        <TimerContext.Provider value={{duration, setDuration}}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimeProvider;