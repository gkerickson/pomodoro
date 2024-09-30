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

    useEffect(() => {
        if (activeTask == null) return;

        clearInterval(intervalId.current)
        intervalId.current = setInterval(() => {
            if (timeRemaining <= 0) {

            }


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
        <CreateTaskComponent addTask={submitNewTask} /> :
        <div style={{ ...centeredOnPage }}>
            <div className="row w-75">
                <div className="col">
                    <div className={"card text-bg-primary" + (onBreak ? "" : " shadow")} style={{ ...(onBreak ? disabledDiv : {}) }}>
                        <div className="card-body">
                            <h2 className="card-title">Active Task</h2>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="card-text">{activeTask.name}</p>
                            <p className="card-text">{activeTask.description}</p>
                            <button disabled={onBreak} type="button" onClick={startBreak} className="btn btn-secondary w-100">Take a break</button>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className={"card card-body w-100 h-100" + (onBreak ? " shadow" : "")} style={centeredOnPage}>
                            <p className="fs-1 fw-bold" style={{}}>{mins}m {secs}s</p>
                            <button disabled={!onBreak} className="btn btn-primary" onClick={startPomodoro}>Continue Task</button>
                    </div>
                </div>
            </div>
        </div>;
}
