import React, { useState, useRef, useEffect } from "react";
import Task from "./components/Task.js"
import CreateTaskComponent from "./components/CreateTaskComponent.js";

const centeredOnPage = {
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
    display: "flex",
};

const POMODORO_LENGTH_MS = 25 * 60 * 1000;

export default function App() {
    const [activeTask, setActiveTask] = useState(null);
    const [inactiveTasks, setInactiveTasks] = useState([]);

    const nextTimeSwitch = useRef();
    const intervalId = useRef();

    const startPomodoro = task => {
        nextTimeSwitch.current = Date.now() + POMODORO_LENGTH_MS;
        setActiveTask(task);
    };

    const startBreak = () => {
        nextTimeSwitch.current = Date.now() + BREAK_LENGTH;
    };

    const finishActiveTask = () => {
        timestamp.current = null;
        setActiveTask(null);
        startBreak(intervalId.current);
    };

    // useEffect(() => {
    //     if (activeTask == null) return;
    //     intervalId.current = setInterval(() => {
    //         if (timestamp.current == null) return;
    //         if ((Date.now() - timestamp.current) < POMODORO_LENGTH_MS) return;
    //     }, 1001);
    // }, [activeTask]);

    return activeTask ?
        <div style={centeredOnPage}>
            <div className="row w-75">
                <div className="col">
                    <div className="card text-bg-primary">
                        <div className="card-body">
                            <h2 className="card-title">Active Task</h2>
                            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="card-text">{activeTask.name}</p>
                            <p className="card-text">{activeTask.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <CreateTaskComponent addTask={startPomodoro} />;
}