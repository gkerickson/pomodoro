import React, { useState, useRef, useEffect } from "react";
import CreateTaskComponent from "./components/CreateTaskComponent.js";

const centeredOnPage = {
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
    display: "flex",
};

const disabledDiv = {
    PointerEvent: "none",
    opacity: "0.5"
}

// const POMODORO_LENGTH_MS = 25 * 60 * 1000;
const POMODORO_LENGTH_MS =  5000;
const BREAK_LENGTH_MS =  5000;
// const BREAK_LENGTH_MS = 5 * 60 * 1000;

export default function App() {
    // const [activeTask, setActiveTask] = useState({name: "test", description: "dummy data"});
    const [activeTask, setActiveTask] = useState(null);
    const [onBreak, setOnBreak] = useState(false);
    // const [onBreak, ] = useState(false);
    // const setOnBreak = ()=> {};

    const nextTimeSwitch = useRef();
    const intervalId = useRef();

    const startPomodoro = () => {
        setOnBreak(false);
        nextTimeSwitch.current = Date.now() + POMODORO_LENGTH_MS;
    };

    const submitNewTask = task => {
        setActiveTask(task);
        startPomodoro();
    }

    const startBreak = () => {
        nextTimeSwitch.current = Date.now() + BREAK_LENGTH_MS;
        setOnBreak(true);
    };

    useEffect(() => {
        if (activeTask == null) return;
        clearInterval(intervalId.current)
        intervalId.current = setInterval(() => {
            if (Date.now() < nextTimeSwitch.current) return; // 
            if (onBreak) {
                startPomodoro();
            } else {
                startBreak();
            }
            clearInterval(intervalId.current)
        }, 1001);
    }, [activeTask, onBreak]);

    return !activeTask ?
        <CreateTaskComponent addTask={submitNewTask} /> :
        <div style={{...centeredOnPage}}>
            <div className="row w-75">
                <div className="col">
                    <div className="card text-bg-primary" style={{...(onBreak ? disabledDiv: {})}}>
                        <div className="card-body">
                            <h2 className="card-title">Active Task</h2>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="card-text">{activeTask.name}</p>
                            <p className="card-text">{activeTask.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
}