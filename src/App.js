import React, { useState, useRef, useEffect } from "react";
import Task from "./components/Task.js"
import CreateTaskComponent from "./components/CreateTaskComponent.js";

const POMODORO_LENGTH_MS = 25 * 60 * 1000;

export default function App() {
    const [activeTask, setActiveTask] = useState(null);
    const [inactiveTasks, setInactiveTasks] = useState([]);

    const nextTimeSwitch = useRef();
    const intervalId = useRef();

    const startPomodoro = task => {
        nextTimeSwitch.current = Date.now() + POMODORO_LENGTH_MS;
        setActiveTask(task);
        setTaskState(ActiveTaskState.ACTIVE_TASK);
    };

    const startBreak = () => {
        nextTimeSwitch.current = Date.now() + BREAK_LENGTH;
        setTaskState(ActiveTaskState.ON_BREAK);
    };

    const finishActiveTask = () => {
        timestamp.current = null;
        setActiveTask(null);
        startBreak(intervalId.current);
    };

    const addTask = task => {
        if (activeTask) {
            setInactiveTasks([...inactiveTasks, task]);
        } else {
        }
    }

    useEffect(() => {
        if (activeTask == null) return;
        intervalId.current = setInterval(() => {
            if (timestamp.current == null) return;
            if ((Date.now() - timestamp.current) < POMODORO_LENGTH_MS) return;
        }, 1001);
    }, [activeTask]);

    return activeTask ? (
        <><div className="section">
            <h2>Active Tasks</h2>
            {activeTask ?
                <Task name={activeTask.name} description={activeTask.description} /> :
                <div className="task">
                    <p>Waiting for Active Task</p>
                </div>
            }
        </div></>) : ( <CreateTaskComponent addTask={addTask} />);



    // {/* <div className="section">
    // <h1>Manage Tasks</h2>
    // {inactiveTasks.map(task => <Task
    // name={task.name}
    // description={task.description}
    // />)}
    // </div> */}
}