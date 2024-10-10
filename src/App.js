import React, { useState, useRef, useEffect } from "react";
import CreateTaskComponent from "./components/CreateTaskComponent.js";
import ThemeColors from "./components/ThemeColors.js";
import ActiveTask from "./components/ActiveTask.js";
import Timer from "./components/Timer.js";

const POMODORO_LENGTH_MS = 25 * 60 * 1000;
const BREAK_LENGTH_MS = 5 * 60 * 1000;

export default function App() {
    // const [activeTask, setActiveTask] = useState({ name: "test", description: "dummy data" });
    const [activeTask, setActiveTask] = useState(null);
    const [onBreak, setOnBreak] = useState(false);
    // const [onBreak, ] = useState(false);
    // const setOnBreak = ()=> {};

    const [timeRemaining, setTimeRemaining] = useState(-1);
    const intervalId = useRef();

    const startPomodoro = () => {
        console.log("Starting pomo")
        setOnBreak(false);
        setTimeRemaining(POMODORO_LENGTH_MS);
    };

    if (activeTask && !onBreak && timeRemaining <= 0) {
        startPomodoro()
    }

    const submitNewTask = task => {
        setActiveTask(task);
    }

    const startBreak = () => {
        setTimeRemaining(BREAK_LENGTH_MS);
        setOnBreak(true);
    };

    const endTask = () => {
        setActiveTask(null);
        setOnBreak(false);
        setTimeRemaining(-1);
    }

    useEffect(() => {
        if (activeTask == null) return;

        clearInterval(intervalId.current)
        intervalId.current = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    if (onBreak) {
                        startPomodoro();
                    } else {
                        startBreak();
                    }
                }
                return prev - 1000;
            })
        }, 1000);

        return () => clearInterval(intervalId.current);
    }, [activeTask, onBreak]);

    const secs = (timeRemaining / 1000) % 60;
    const mins = (timeRemaining / 1000 - secs) / 60;

    return !activeTask ?
        <>
            <ThemeColors />
            <CreateTaskComponent addTask={submitNewTask} /></> :
        <div className="centered-on-page">
            <div className="row w-75">
                <div className="col">
                    <ActiveTask onBreak={onBreak} activeTask={activeTask} startBreak={startBreak} endTask={endTask} />
                </div>
                <div className="col-3">
                    <Timer startPomodoro={startPomodoro} onBreak={onBreak} mins={mins} secs={secs} />
                </div>
            </div>
        </div>;
}
