import React, { useState, useRef } from "react";

export default function CreateTaskComponent(props) {
    const [taskName, setTaskName] = useState(props?.taskName ?? "Select a task title");
    const [taskDescription, setTaskDescription] = useState(props?.taskDescription ?? "");

    function onAddTask() {
        props.addTask({ name: taskName, description: taskDescription });
        setTaskName("");
        setTaskDescription("");
    }

    return (
        <div className="task">
            <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
            <p>Task Description</p>
            <input type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)}></input>
            <button onClick={onAddTask}>Create</button>
        </div>
    );
}
