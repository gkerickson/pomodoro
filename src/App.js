import React, { useState, useRef, useEffect } from "react";
import CreateTaskComponent from "./components/CreateTaskComponent.js";
import ThemeColors from "./components/ThemeColors.js";
import ActiveTask from "./components/ActiveTask.js";
import Task from "./components/Task.js";
import Timer from "./components/Timer.js";

const POMODORO_LENGTH_MS = 25 * 60 * 1000;
const BREAK_LENGTH_MS = 5 * 60 * 1000;

export default function App() {
    // const [activeTask, setActiveTask] = useState({ name: "test", description: "dummy data" });
    // const [taskBacklog, setTaskBacklog] = useState([{ name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }, { name: "test", description: "dummy data" }]);
    const [taskBacklog, setTaskBacklog] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    const [onBreak, setOnBreak] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const intervalId = useRef();

    useEffect(() => {
        const savedTaskBacklog = localStorage.getItem("taskBacklog");
        if (savedTaskBacklog && savedTaskBacklog.length > 0) {
            setTaskBacklog(JSON.parse(savedTaskBacklog));
        }

        const savedActiveTask = localStorage.getItem("activeTask");
        if (savedActiveTask) {
            setActiveTask(JSON.parse(savedActiveTask));
        }

        const savedExpirationTime = localStorage.getItem("expirationTime");
        if (savedExpirationTime && !isNaN(savedExpirationTime)) {
            setTimeRemaining(Math.round((savedExpirationTime - Date.now()) / 1000) * 1000);
        }

        const onBreak = localStorage.getItem("onBreak");
        if (onBreak) {
            setOnBreak(JSON.parse(onBreak));
        }
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("taskBacklog", JSON.stringify(taskBacklog));
            localStorage.setItem("activeTask", JSON.stringify(activeTask));
            localStorage.setItem("expirationTime", JSON.stringify((timeRemaining + Date.now())));
            localStorage.setItem("onBreak", JSON.stringify(onBreak));
        }

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [taskBacklog, activeTask, timeRemaining]);

    const startPomodoro = () => {
        console.log("Starting pomo")
        setOnBreak(false);
        setTimeRemaining(POMODORO_LENGTH_MS);
    };

    if (activeTask && !onBreak && timeRemaining <= 0) {
        startPomodoro()
    }

    const submitNewTask = task => {
        if (activeTask == null) {
            setActiveTask(task);
        } else {
            setTaskBacklog([...taskBacklog, task]);
        }
    }

    const startBreak = () => {
        setTimeRemaining(BREAK_LENGTH_MS);
        setOnBreak(true);
    };

    const endTask = () => {
        if (taskBacklog.length > 0) {
            setActiveTask(taskBacklog[0]);
            setTaskBacklog(taskBacklog.slice(1));
        } else {
            setActiveTask(null);
            setOnBreak(false);
            setTimeRemaining(-1);
        }
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
        <div className="container centered-on-page">
            <ThemeColors />
            <CreateTaskComponent addTask={submitNewTask} />
        </div> :
        <div className="container my-5">
            <div className="row">
                <div className="col-9">
                    <ActiveTask onBreak={onBreak} activeTask={activeTask} startBreak={startBreak} endTask={endTask} />
                </div>
                <div className="col-3">
                    <Timer startPomodoro={startPomodoro} onBreak={onBreak} mins={mins} secs={secs} />
                </div>
            </div>
            <div className="row py-3">
                <div className="col">
                    <CreateTaskComponent addTask={submitNewTask} />
                </div>
            </div>
            <div className="row py-3">
                {taskBacklog.map((task, index) => (
                    <div key={index} className="col col-3 py-3">
                        <Task name={task.name} description={task.description} />
                    </div>
                ))}
            </div>
        </div>;
}
